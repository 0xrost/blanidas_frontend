import { createFileRoute } from '@tanstack/react-router'
import InstitutionsPage from "@/presentation/pages/manager/InstitutionsPage.tsx";
import type {Pagination} from "@/domain/pagination.ts";

export const Route = createFileRoute(
  '/_authenticated/manager/dashboard/institutions',
)({
  component: InstitutionsPage,
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
