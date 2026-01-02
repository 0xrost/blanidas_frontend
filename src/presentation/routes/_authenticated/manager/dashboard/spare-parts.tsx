import { createFileRoute } from '@tanstack/react-router'
import SparePartsListPage from "@/presentation/pages/manager/SparePartsListPage.tsx";
import type {Pagination} from "@/domain/pagination.ts";

export const Route = createFileRoute('/_authenticated/manager/dashboard/spare-parts')({
    component: SparePartsListPage,
    validateSearch: (search: {
        page?: number
        limit?: string
    }): Pagination => {
        return {
            page: Number(search?.page ?? 1),
            limit: Number(search?.limit ?? 15),
        }
    },
})
