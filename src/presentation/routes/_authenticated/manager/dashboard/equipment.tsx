import { createFileRoute } from '@tanstack/react-router'
import EquipmentPage from "@/presentation/pages/manager/EquipmentPage.tsx";
import type {SearchParams} from "@/presentation/components/tabs/equipment/filter.ts";
import type {PaginationSearch} from "@/presentation/models.ts";

type Search = PaginationSearch & SearchParams;

const defaultSearch = {
  page: "1",
  limit: "15",
  institutionId: "all",
  modelId: "all",
  manufacturerId: "all",
  status: "all",
  sortOrder: "asc",
  sortBy: "name",
  search: ""
} satisfies Search;

export const Route = createFileRoute('/_authenticated/manager/dashboard/equipment')({
  component: EquipmentPage,
  validateSearch: (search: Partial<Search>): Search => {
    return { ...defaultSearch, ...search };
  },
})

export type { Search };
