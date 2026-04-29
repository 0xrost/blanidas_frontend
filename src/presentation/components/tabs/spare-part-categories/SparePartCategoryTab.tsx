import {Tag} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateSparePartCategory, useDeleteSparePartCategory,
    useSparePartCategories,
    useUpdateSparePartCategory
} from "@/presentation/hooks/entities/spare-part-category.ts";
import type {Pagination} from "@/domain/pagination.ts";
import type {Search} from "@/presentation/routes/_authenticated/dashboard/manager/settings";
import type {FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";

interface Props {
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: FiltersPanelValues;
}
const SparePartCategoryTab = ({ pagination, onSearchChange, searchParams }: Props) => {
    const config = {
        list: useSparePartCategories,
        create: useCreateSparePartCategory,
        update: useUpdateSparePartCategory,
        delete_: useDeleteSparePartCategory,
        icon: Tag,
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

export default SparePartCategoryTab;