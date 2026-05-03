import type {SparePart} from "@/domain/entities/spare-part.ts";
import {useMemo, useState} from "react";
import type {SparePartUpdate} from "@/domain/models/spare-part.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import {composeMutationOptions} from "@/presentation/utils.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import {modalFieldsFactory, type ModalFormData} from "@/presentation/components/tabs/spare-parts/modal.ts";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Briefcase, ChevronDown, ChevronUp, Warehouse} from "lucide-react";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import {errorMessages} from "@/presentation/components/tabs/spare-parts/SparePartsTab.tsx";
import type {Institution} from "@/domain/entities/institution.ts";
import type {LocationCreate} from "@/domain/models/spare-part.ts";
import SparePartMobileLocations from "@/presentation/components/tabs/spare-parts/SparePartMobileLocations.tsx";
import StatusIcon from "../../layouts/StatusIcon";
import {pluralize} from "@/presentation/utils.ts";

interface Props {
    sparePart: SparePart;
    models: EquipmentModel[];
    categories: SparePartCategory[];
    institutions: Institution[];
    updateSparePart: (data: SparePartUpdate, options?: MutationOptions) => void;
    deleteSparePart: (id: string, options?: MutationOptions) => void;
    updateLocations: (sparePartId: string, locations: LocationCreate[], options?: MutationOptions) => void;
}

const SparePartMobileItem = ({sparePart, models, categories, institutions, updateSparePart, deleteSparePart, updateLocations}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModels, setShowModels] = useState(false);
    const [showLocations, setShowLocations] = useState(false);
    const [updatingError, setUpdatingError] = useTimedError<string | null>(null, 5000);
    const [deletingError, setDeletingError] = useTimedError<boolean>(false, 5000);

    const modalFields = useMemo(() => modalFieldsFactory(categories, models), [categories, models]);
    const restoredQuantity = useMemo(
        () => sparePart.locations.reduce((acc, x) => acc + x.restoredQuantity, 0),
        [sparePart.locations]
    );

    const onUpdate = (data: ModalFormData, options?: MutationOptions) => {
        updateSparePart({
            ...data,
            id: sparePart.id,
            sparePartCategoryId: data.sparePartCategoryId,
        }, composeMutationOptions({
            onSuccess: () => { setUpdatingError(null); },
            onError: (error) => {setUpdatingError(
                error?.code == "value already exists" && error?.fields == "name"
                    ? errorMessages.name
                    : errorMessages.update
            )}
        }, options));
    };

    const onDelete = (options?: MutationOptions) => {
        deleteSparePart(sparePart.id, composeMutationOptions({
            onSuccess: () => setDeletingError(false),
            onError: () => setDeletingError(true),
        }, options));
    };

    return (
        <div className="border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center min-w-0">
                        <StatusIcon
                            status={sparePart.stockStatus}
                            statusToStyleMap={{
                                in_stock: "green",
                                low_stock: "yellow",
                                out_of_stock: "red",
                            }}
                        />
                        <p className="text-base font-medium text-slate-900">
                            {sparePart.name}
                        </p>
                    </div>
                </div>

                <div className="text-xs flex sm:hidden items-center mt-1 gap-2">
                    <div>
                        <p className="text-sm leading-none font-medium text-slate-900">{sparePart.totalQuantity} шт.</p>
                    </div>
                    <div>
                        <p className="leading-none font-medium text-yellow-600">мін: {sparePart.minQuantity}</p>
                    </div>
                    <div className="text-right">
                        <p className="leading-none font-medium text-green-700">відновлено: {restoredQuantity}</p>
                    </div>
                </div>

                <div className="hidden sm:block text-right mr-2">
                    <p className="text-sm font-medium text-slate-900">{sparePart.totalQuantity} (мін: {sparePart.minQuantity})</p>
                    <p className="text-xs text-slate-500">з них відновлені {restoredQuantity}</p>
                </div>
            </div>


            <div className="flex justify-between mt-2 border-t border-slate-200 pt-2 gap-2">
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowLocations((x) => !x)}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <Warehouse className="w-4 h-4" />
                        <span className="hidden sm:inline">{sparePart.locations.length} {pluralize(sparePart.locations.length, "склад", "склади", "складів")}</span>
                        {showLocations ? (
                            <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                            <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                        )}
                    </Button>

                    <div className="flex items-center gap-2 min-w-0">
                        {sparePart.compatibleModels.length > 0 && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setShowModels((x) => !x)}
                                className="inline-flex items-center gap-1 rounded-md border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                <Briefcase className="w-4 h-4" />
                                <span className="hidden sm:inline">Сумісні моделі</span>
                                {showModels ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </Button>
                        )}
                    </div>
                </div>
                <div className="shrink-0">
                    <EditDeleteActions
                        edit={() => setIsModalOpen(true)}
                        delete_={() => onDelete()}
                    />
                </div>
            </div>

            {showModels && (
                <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                    {sparePart.compatibleModels.length === 0 ? (
                        <p className="text-xs text-slate-600">Немає сумісних моделей</p>
                    ) : (
                        <ul className="space-y-1">
                            {sparePart.compatibleModels.map((m) => (
                                <li key={m.id} className="text-xs text-slate-700">
                                    {m.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {showLocations && (
                <div className="mt-3">
                    <SparePartMobileLocations
                        locations={sparePart.locations.map((l) => ({
                            institution: l.institution,
                            quantity: l.quantity,
                            restoredQuantity: l.restoredQuantity,
                        }))}
                        institutions={institutions}
                        save={(locations, options) => updateLocations(sparePart.id, locations, options)}
                    />
                </div>
            )}

            {deletingError && (
                <p className="mt-3 text-xs text-red-700">
                    {errorMessages.delete}
                </p>
            )}

            <FormModal
                title="Додати запчастину"
                description="Внесіть інформацію про нову запчастину"
                submitText="Зберегти зміни"
                submit={onUpdate}
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                fields={modalFields}
                errors={updatingError ? [updatingError] : []}
                initialValues={{
                    name: sparePart.name,
                    minQuantity: sparePart.minQuantity,
                    sparePartCategoryId: sparePart.category?.id ?? "",
                    compatibleModelIds: sparePart.compatibleModels.map(x => x.id),
                }}
            />
        </div>
    );
};

export default SparePartMobileItem;

