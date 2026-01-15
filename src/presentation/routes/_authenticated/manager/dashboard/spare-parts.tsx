import { createFileRoute } from '@tanstack/react-router'
import SparePartsPage from "@/presentation/pages/manager/SparePartsPage.tsx";
import type {SearchParams} from "@/presentation/components/tabs/spare-parts/filter.ts";
import type {PaginationSearch} from "@/presentation/models.ts";

type Search = PaginationSearch & SearchParams;

const defaultSearch = {
    page: "1",
    limit: "15",
    institutionId: "all",
    sparePartCategoryId: "all",
    equipmentModelId: "all",
    status: "all",
    sortOrder: "asc",
    sortBy: "name",
    search: ""
} satisfies Search;

export const Route = createFileRoute('/_authenticated/manager/dashboard/spare-parts')({
    component: SparePartsPage,
    validateSearch: (search: Partial<Search>): Search => {
        return { ...defaultSearch, ...search };
    },
})

export type { Search };
