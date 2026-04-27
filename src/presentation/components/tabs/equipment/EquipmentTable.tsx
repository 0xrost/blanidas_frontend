import {useCallback, useMemo, useState} from "react";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {composeMutationOptions} from "@/presentation/utils.ts";
import {Building2, MapPin, Monitor, QrCode} from "lucide-react";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import type {Equipment} from "@/domain/entities/equipment.ts";
import type {EquipmentUpdate} from "@/domain/models/equipment.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import {modalFieldsFactory, type ModalFormData} from "@/presentation/components/tabs/equipment/modal.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import {errorMessages} from "@/presentation/components/tabs/equipment/EquipmentTab.tsx";
import EmptyTable from "@/presentation/components/layouts/EmptyTable.tsx";
import StatusIcon from "../../layouts/StatusIcon";


interface Props {
    equipment: Equipment[];
    institutions: Institution[];
    models: EquipmentModel[];
    manufacturers: Manufacturer[];
    categories: EquipmentCategory[]

    update: (member: EquipmentUpdate, options?: MutationOptions) => void;
    delete_: (id: string, options: MutationOptions) => void;
    showQr: (equipment: Equipment) => void;
}

const EquipmentTable = ({equipment, institutions, models, manufacturers, categories, update, delete_, showQr}: Props) => {
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
    const [failedDeletingEquipmentIds, setFailedDeletingEquipmentIds] = useTimedError<string[]>([], 5000);
    const [updatingError, setUpdatingError] = useTimedError<string | null>(null, 5000);

    const onUpdate = (data: ModalFormData, options?: MutationOptions) => {
        if (!editingEquipment) return;

        update({...data, id: editingEquipment.id }, composeMutationOptions({
            onSuccess: () => { setUpdatingError(null); },
            onError: (error) => setUpdatingError(
                error?.code == "value already exists" && error.fields == "serial_number"
                    ? errorMessages.serialNumber
                    : errorMessages.update
            )
        }, options));
    };

    const onDelete = useCallback((id: string) => {
        delete_(id, {
            onSuccess: () => setFailedDeletingEquipmentIds(prev => prev.filter(x => x !== id)),
            onError: () => setFailedDeletingEquipmentIds(prev => [...prev, id]),
        });
    }, [delete_, setFailedDeletingEquipmentIds]);

    const modalFields = useMemo(
        () => modalFieldsFactory(institutions, models, manufacturers, categories),
    [institutions, models, manufacturers, categories])

    return (
        <>
            <div className="md:hidden">
                {equipment.length === 0 ? (
                    <EmptyTable title="Обладнання не знайдено" icon={Monitor} />
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                        {equipment.map((item) => (
                            <div
                                key={item.id}
                                className="w-full p-4"
                            >
                                <div className="min-w-0">
                                    <p
                                     className="text-sm flex items-center font-medium text-slate-900 truncate"
                                     title={item.model.name}
                                     >
                                        <StatusIcon 
                                            status={item.status}
                                            statusToStyleMap={{
                                                working: "green",
                                                not_working: "red",
                                                under_maintenance: "yellow",
                                            }}
                                        />
                                        <span className="truncate">{item.model.name}</span>
                                    </p>
                                    <p className="text-xs text-slate-800 font-medium truncate mt-0.5">
                                        {item.serialNumber}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-slate-700 mt-2">
                                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                                        <span className="truncate">
                                            {item.institution.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-slate-600 mt-2">
                                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                        <span className="truncate">
                                            {item.location}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-2 mt-4">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => showQr(item)}
                                        className="border-slate-300 text-slate-700 justify-center hover:bg-slate-50 h-8 p-0"
                                    >
                                        <QrCode />
                                        <span>Згенерувати QR-код</span>
                                    </Button>
                                    <EditDeleteActions
                                        edit={() => setEditingEquipment(item)}
                                        delete_={() => onDelete(item.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="hidden md:block">
                {equipment.length === 0 ? (
                    <EmptyTable title="Обладнання не знайдено" icon={Monitor} />
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,2fr)_auto]  lg:grid-cols-[minmax(0,2fr)_minmax(0,1.8fr)_minmax(0,1.4fr)_auto] gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 uppercase tracking-wider">
                            <div>Обладнання</div>
                            <div>Місцезнаходження</div>
                            <div className="hidden lg:block">Виробник</div>
                            <div className="text-right">Дії</div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {equipment.map((item) => (
                                <div key={item.id}>
                                    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.8fr)_auto]  lg:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)_auto] gap-4 px-4 py-3 items-center hover:bg-slate-50 transition-colors">
                                        <div className="min-w-0">
                                            <div className="flex items-center min-w-0">
                                                <StatusIcon 
                                                    status={item.status}
                                                    statusToStyleMap={{
                                                        working: "green",
                                                        not_working: "red",
                                                        under_maintenance: "yellow",
                                                    }}
                                                />
                                                <p className="text-sm font-medium text-slate-900 truncate" title={item.model.name}>
                                                    {item.model.name}
                                                </p>
                                            </div>
                                            <p className="text-xs font-medium text-slate-900 truncate mt-0.5" title={item.serialNumber}>
                                                {item.serialNumber}
                                            </p>
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <Building2 className="w-4 h-4 text-slate-300 shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-slate-900 truncate" title={item.institution.name}>
                                                        {item.institution.name}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-xs text-slate-600 min-w-0">
                                                        <span className="truncate" title={item.location}>
                                                            {item.location}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hidden lg:block min-w-0">
                                            <p className="text-sm text-slate-700 truncate" title={item.manufacturer?.name ?? "—"}>
                                                {item.manufacturer?.name ?? "—"}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                title="Згенерувати QR-код"
                                                onClick={() => showQr(item)}
                                                className="border-slate-300 text-slate-600 hover:bg-slate-50 h-8 w-8 p-0"
                                            >
                                                <QrCode />
                                            </Button>
                                            <EditDeleteActions
                                                edit={() => setEditingEquipment(item)}
                                                delete_={() => onDelete(item.id)}
                                            />
                                        </div>
                                    </div>

                                    {failedDeletingEquipmentIds.includes(item.id) && (
                                        <div className="px-4 pb-3">
                                            <p className="text-xs text-red-700">
                                                {errorMessages.delete}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {editingEquipment && (
                <FormModal
                    isOpen
                    close={() => setEditingEquipment(null)}
                    title="Редагувати обладнання"
                    description="Внесіть зміни до інформації про обладнання"
                    fields={modalFields}
                    submit={onUpdate}
                    submitText="Зберегти зміни"
                    errors={updatingError ? [updatingError] : []}
                    initialValues={{
                        location: editingEquipment.location,
                        serialNumber: editingEquipment.serialNumber,
                        institutionId: editingEquipment.institution.id,
                        modelId: editingEquipment.model.id,
                        manufacturerId: editingEquipment.manufacturer?.id ?? "",
                        categoryId: editingEquipment.category?.id ?? "",
                        installed: editingEquipment.installed,
                    }}
                />
            )}
        </>
    );
};

export default EquipmentTable;