import {createFileRoute} from '@tanstack/react-router'
import RepairRequestsListPage from "@/presentation/pages/engineer/RepairRequestsListPage.tsx";
import type {Pagination} from "@/domain/models/pagination.ts";


export const Route = createFileRoute('/engineer/dashboard/repair-requests/')({
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
