import {Tag} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateSparePartCategory, useDeleteSparePartCategory,
    useSparePartCategories,
    useUpdateSparePartCategory
} from "@/presentation/hooks/entities/spare-part-category.ts";
import type {Pagination} from "@/domain/pagination.ts";

interface Props {
    pagination: Pagination;
    onPaginationChange: (pagination: Pagination) => void;
}
const SparePartCategoryTab = ({ pagination, onPaginationChange }: Props) => {
    const config = {
        list: useSparePartCategories,
        create: useCreateSparePartCategory,
        update: useUpdateSparePartCategory,
        delete_: useDeleteSparePartCategory,
        icon: Tag,
    }

    return (
        <NameOnlyTab pagination={pagination} onPaginationChange={onPaginationChange} config={config} />
    );
}

export default SparePartCategoryTab;