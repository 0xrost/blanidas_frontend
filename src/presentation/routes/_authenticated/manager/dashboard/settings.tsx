import { createFileRoute } from '@tanstack/react-router'
import SettingsPage from "@/presentation/pages/manager/SettingsPage.tsx";
import type {Tab} from "@/presentation/components/tabs/settings/SettingsTab.tsx";
import type {SearchParams as StaffSearchParams} from "@/presentation/components/tabs/staff/filter.ts";
import type {SearchParams as InstitutionSearchParams} from "@/presentation/components/tabs/institutions/filter.ts";
import type {PaginationSearch} from "@/presentation/models.ts";

type SearchParams = StaffSearchParams & InstitutionSearchParams;
type Search = { tab: Tab } & PaginationSearch & SearchParams;

const defaultSearch = {
  page: "1",
  limit: "15",
  typeId: "all",
  tab: "staff",
  role: "all",
  sortOrder: "asc",
  search: ""
} satisfies Search;

export const Route = createFileRoute('/_authenticated/manager/dashboard/settings')({
  component: SettingsPage,
  validateSearch: (search: Partial<Search>): Search => {
    return { ...defaultSearch, ...search };
  },
})

export type { Search, SearchParams };
