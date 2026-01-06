import { createFileRoute } from '@tanstack/react-router'
import RepairRequestsPage from "@/presentation/pages/manager/RepairRequestsPage.tsx";
import type {Pagination} from "@/domain/pagination.ts";

export const Route = createFileRoute('/_authenticated/manager/dashboard/repair-requests/')({
  component: RepairRequestsPage,
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

