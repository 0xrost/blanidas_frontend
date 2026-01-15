import { createFileRoute } from '@tanstack/react-router'
import RepairRequestsPage from "@/presentation/pages/manager/RepairRequestsPage.tsx";
import type {SearchParams} from "@/presentation/components/tabs/repair-requests/filters.ts";
import type {PaginationSearch} from "@/presentation/models.ts";

type Search = PaginationSearch & SearchParams

const defaultSearch = {
  page: "1",
  limit: "15",
  search: "",
  categoryId: "all",
  institutionId: "all",
  status: "all",
  sortOrder: "desc",
  sortBy: "date",
  urgency: "all",
} satisfies Search;


export const Route = createFileRoute('/_authenticated/manager/dashboard/repair-requests/')({
  component: RepairRequestsPage,
  validateSearch: (search: Partial<Search>): Search => {
    return { ...defaultSearch, ...search };
  },
})

export type { Search };
export { defaultSearch };

