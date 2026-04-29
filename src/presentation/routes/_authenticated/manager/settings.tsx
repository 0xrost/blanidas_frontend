import { createFileRoute } from '@tanstack/react-router'
import SettingsPage from "@/presentation/pages/manager/SettingsPage.tsx";
import type {Tab} from "@/presentation/components/tabs/settings/SettingsTab.tsx";
import type {SearchParams as StaffSearchParams} from "@/presentation/components/tabs/staff/filter.ts";
import type {PaginationSearch} from "@/presentation/models.ts";
import type {FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";

type SearchParams = StaffSearchParams & FiltersPanelValues;
type Search = { tab: Tab } & PaginationSearch & SearchParams;

const defaultSearch = {
  page: "1",
  limit: "15",
  tab: "staff",
  role: "all",
  sortOrder: "asc",
  search: ""
} satisfies Search;

export const Route = createFileRoute('/_authenticated/manager/settings')({
  component: SettingsPage,
  validateSearch: (search: Partial<Search>): Search => {
    return { ...defaultSearch, ...search };
  },
})

export type { Search, SearchParams };
