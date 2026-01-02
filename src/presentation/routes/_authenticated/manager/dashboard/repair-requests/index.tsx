import { createFileRoute } from '@tanstack/react-router'
import RepairRequestsListPage from "@/presentation/pages/manager/RepairRequestsListPage.tsx";
import type {Pagination} from "@/domain/models/pagination.ts";

export const Route = createFileRoute('/_authenticated/manager/dashboard/repair-requests/')({
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

