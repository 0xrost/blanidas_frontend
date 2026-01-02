import type {SparePart} from "@/domain/entities/spare-part.ts";
import {useState} from "react";
import type {Institution} from "@/domain/entities/institution.ts";
import type {LocationCreate, SparePartUpdate} from "@/domain/models/spare-part.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import SparePartLocations from "@/presentation/components/tabs/spare-parts/SparePartLocations.tsx";
import SparePartItemRow from "@/presentation/components/tabs/spare-parts/SparePartItemRow.tsx";
import Notification from "@/presentation/components/layouts/Notification.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import SparePartFormModal, {
    type SparePartFormData
} from "@/presentation/components/tabs/spare-parts/SparePartFormModal.tsx";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import {composeMutationOptions} from "@/presentation/utils.ts";

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
    sparePart, updateLocations, institutions, suppliers, models, categories, manufacturers, updateSparePart, deleteSparePart
}: Props) => {
    const [areLocationsVisible, setAreLocationsVisible] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [error, setError] = useTimedError<boolean>(false, 5000);

    const onSubmit = (data: SparePartFormData, options?: MutationOptions) => {
        updateSparePart({
            ...data,
            id: sparePart.id,
            sparePartCategoryId: data.categoryId,
        }, options);
    }

    const onDeleteSparePart = (options?: MutationOptions) => {
        deleteSparePart(sparePart.id, composeMutationOptions({
            onSuccess: () => setError(false),
            onError: () => setError(true),
        }, options));
    }

    return (
        <>
            <SparePartItemRow
                sparePart={sparePart}
                deleteSparePart={onDeleteSparePart}
                showModal={() => setIsModalVisible(true)}
                setLocationVisible={setAreLocationsVisible}
                areLocationVisible={areLocationsVisible}
            />
            {error &&
                <tr className="bg-slate-50">
                    <td colSpan={7} className="px-4 py-2">
                        <Notification type="error" message="Не вдалося видалити запчастину. Спробуйте ще раз" />
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
            <SparePartFormModal
                initialValues={{
                    name: sparePart.name,
                    manufacturerId: sparePart.id,
                    supplierId: sparePart.supplier.id,
                    minQuantity: sparePart.minQuantity,
                    categoryId: sparePart.category.id,
                    compatibleModelIds: sparePart.compatibleModels.map(x => x.id),
                }}
                submit={onSubmit}
                isOpen={isModalVisible}
                close={() => setIsModalVisible(false)}
                suppliers={suppliers}
                models={models}
                categories={categories}
                manufacturers={manufacturers}
            />
        </>
    );
}

export default SparePartItem;