import { createFileRoute } from '@tanstack/react-router'
import EquipmentPage from "@/presentation/pages/manager/EquipmentPage.tsx";
import type {Pagination} from "@/domain/pagination.ts";

export const Route = createFileRoute('/_authenticated/manager/dashboard/equipment')({
  component: EquipmentPage,
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
