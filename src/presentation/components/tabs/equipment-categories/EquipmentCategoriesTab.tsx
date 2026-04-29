import type {Pagination} from "@/domain/pagination.ts";
import {Layers} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateEquipmentCategory, useDeleteEquipmentCategory,
    useEquipmentCategories,
    useUpdateEquipmentCategory
} from "@/presentation/hooks/entities/equipment-category.ts";
import type {Search} from "@/presentation/routes/_authenticated/manager/settings";
import type {FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";

interface Props {
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: FiltersPanelValues;
}
const EquipmentCategoriesTab = ({ pagination, onSearchChange, searchParams }: Props) => {
    const config = {
        list: useEquipmentCategories,
        create: useCreateEquipmentCategory,
        update: useUpdateEquipmentCategory,
        delete_: useDeleteEquipmentCategory,
        icon: Layers,
    }

    return (
        <NameOnlyTab
            pagination={pagination}
            config={config}
            onSearchChange={onSearchChange}
            searchParams={searchParams}
        />
    );
}

export default EquipmentCategoriesTab;