import type {Pagination} from "@/domain/pagination.ts";
import {Layers} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateEquipmentCategory, useDeleteEquipmentCategory,
    useEquipmentCategories,
    useUpdateEquipmentCategory
} from "@/presentation/hooks/entities/equipment-category.ts";

interface Props {
    pagination: Pagination;
    onPaginationChange: (pagination: Pagination) => void;
}
const EquipmentCategoriesTab = ({ pagination, onPaginationChange }: Props) => {
    const config = {
        list: useEquipmentCategories,
        create: useCreateEquipmentCategory,
        update: useUpdateEquipmentCategory,
        delete_: useDeleteEquipmentCategory,
        icon: Layers,
    }

    return (
        <NameOnlyTab pagination={pagination} onPaginationChange={onPaginationChange} config={config} />
    );
}

export default EquipmentCategoriesTab;