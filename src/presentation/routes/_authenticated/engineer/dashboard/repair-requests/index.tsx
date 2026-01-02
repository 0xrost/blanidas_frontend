import {createFileRoute} from '@tanstack/react-router'
import RepairRequestsListPage from "@/presentation/pages/engineer/RepairRequestsListPage.tsx";
import type {Pagination} from "@/domain/pagination.ts";


export const Route = createFileRoute('/_authenticated/engineer/dashboard/repair-requests/')({
    component: RepairRequestsListPage,

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
