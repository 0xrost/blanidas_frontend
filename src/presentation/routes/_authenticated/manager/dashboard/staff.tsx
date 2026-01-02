import {createFileRoute} from '@tanstack/react-router'
import StaffPage from "@/presentation/pages/manager/StaffPage.tsx";
import type {Pagination} from "@/domain/pagination.ts";

export const Route = createFileRoute('/_authenticated/manager/dashboard/staff')({
    component: StaffPage,
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
