import { createFileRoute } from '@tanstack/react-router'
import SettingsPage from "@/presentation/pages/manager/SettingsPage.tsx";
import type {Pagination} from "@/domain/pagination.ts";
import type {Tab} from "@/presentation/components/tabs/settings/SettingsTab.tsx";

interface SearchParams extends Pagination {
    tab: Tab;
}

export const Route = createFileRoute('/_authenticated/manager/dashboard/settings')({
  component: SettingsPage,
  validateSearch: (search: {
    tab?: Tab
    page?: number
    limit?: string
  }): SearchParams => {
    return {
      tab: search.tab ?? "sparePartCategories",
      page: Number(search?.page ?? 1),
      limit: Number(search?.limit ?? 15),
    }
  },
})

export type { SearchParams };
