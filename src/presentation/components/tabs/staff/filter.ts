import type {FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";
import type {Role} from "@/domain/auth/roles.ts";

interface SearchParams extends FiltersPanelValues { role: Role | "all"; }

const filterFields = {
    key: 'role',
    options: [
        { value: 'all', label: 'Усі ролі' },
        { value: "admin", label: "Адмін" },
        { value: 'engineer', label: "Інженер" },
        { value: "manager", label: "Менеджер" },
    ],
};

export { filterFields };
export type { SearchParams };