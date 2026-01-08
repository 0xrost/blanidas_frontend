import type {SparePart} from "@/domain/entities/spare-part.ts";
import {useMemo, useState} from "react";
import type {Institution} from "@/domain/entities/institution.ts";
import type {LocationCreate, SparePartUpdate} from "@/domain/models/spare-part.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import SparePartLocations from "@/presentation/components/tabs/spare-parts/SparePartLocations.tsx";
import SparePartItemRow from "@/presentation/components/tabs/spare-parts/SparePartItemRow.tsx";
import Notification from "@/presentation/components/layouts/Notification.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import {composeMutationOptions} from "@/presentation/utils.ts";
import {modalFieldsFactory, type ModalFormData} from "@/presentation/components/tabs/spare-parts/modal.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import {errorMessages} from "@/presentation/components/tabs/spare-parts/SparePartsTab.tsx";

interface Props {
    sparePart: SparePart;
    updateLocations: (
        sparePartId: string,
        locations: LocationCreate[],
        options?: MutationOptions,
    ) => void;

    updateSparePart: (data: SparePartUpdate, options?: MutationOptions) => void;
    deleteSparePart: (id: string, options?: MutationOptions) => void;

    institutions: Institution[];
    suppliers: Supplier[];
    models: EquipmentModel[];
    categories: SparePartCategory[];
    manufacturers: Manufacturer[];
}

const SparePartItem = ({
   sparePart,
   updateLocations,
   institutions,
   suppliers,
   models,
   categories,
   manufacturers,
   updateSparePart,
   deleteSparePart
}: Props) => {
    const [areLocationsVisible, setAreLocationsVisible] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [updatingError, setUpdatingError] = useTimedError<string | null>(null, 5000);
    const [deletingError, setDeletingError] = useTimedError<boolean>(false, 5000);

    const modalFields = useMemo(
        () => modalFieldsFactory(institutions, categories, suppliers, manufacturers, models),
    [institutions, categories, suppliers, manufacturers, models])

    const onUpdate = (data: ModalFormData, options?: MutationOptions) => {
        updateSparePart({
            ...data,
            id: sparePart.id,
            sparePartCategoryId: data.categoryId,
        }, composeMutationOptions({
            onSuccess: () => { setUpdatingError(null); },
            onError: (error) => {setUpdatingError(
                error?.code == "value already exists" && error?.fields == "name"
                    ? errorMessages.name
                    : errorMessages.update
            )}
        }, options));
    }

    const onDelete = (options?: MutationOptions) => {
        deleteSparePart(sparePart.id, composeMutationOptions({
            onSuccess: () => setDeletingError(false),
            onError: () => setDeletingError(true),
        }, options));
    }

    return (
        <>
            <SparePartItemRow
                sparePart={sparePart}
                deleteSparePart={onDelete}
                showModal={() => setIsModalOpen(true)}
                setLocationVisible={setAreLocationsVisible}
                areLocationVisible={areLocationsVisible}
            />
            {deletingError &&
                <tr className="bg-slate-50">
                    <td colSpan={7} className="px-4 py-2">
                        <Notification type="error" message={errorMessages.delete} />
                    </td>
                </tr>
            }
            {areLocationsVisible &&
                <SparePartLocations
                    locations={sparePart.locations}
                    institutions={institutions}
                    save={(locations, options) => updateLocations(sparePart.id, locations, options)}
                />
            }

            <FormModal
                title="Додати запчастину"
                description="Внесіть інформацію про нову запчастину"
                submitText="Додати"
                submit={onUpdate}
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                fields={modalFields}
                errors={updatingError ? [updatingError] : []}
                initialValues={{
                    name: sparePart.name,
                    minQuantity: sparePart.minQuantity,
                    sparePartCategoryId: sparePart.category.id,
                    supplierId: sparePart.supplier.id,
                    manufacturerId: sparePart.manufacturer.id,
                    compatibleModelIds: sparePart.compatibleModels.map(x => x.id),
                }}
            />
        </>
    );
}

export default SparePartItem;