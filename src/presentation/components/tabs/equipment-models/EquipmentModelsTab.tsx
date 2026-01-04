import {Monitor} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateEquipmentModel, useDeleteEquipmentModel,
    useEquipmentModels,
    useUpdateEquipmentModel
} from "@/presentation/hooks/entities/equipment-model.ts";
import type {Pagination} from "@/domain/pagination.ts";


interface Props {
    pagination: Pagination;
    onPaginationChange: (pagination: Pagination) => void;
}
const EquipmentModelsTab = ({ pagination, onPaginationChange }: Props) => {
    const config = {
        list: useEquipmentModels,
        create: useCreateEquipmentModel,
        update: useUpdateEquipmentModel,
        delete_: useDeleteEquipmentModel,
        icon: Monitor,
    }

    return (
        <NameOnlyTab pagination={pagination} onPaginationChange={onPaginationChange} config={config} />
    );
};

export default EquipmentModelsTab;