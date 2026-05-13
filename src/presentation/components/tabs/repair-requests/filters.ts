import type {FilterConfig, FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";
import type {Institution} from "@/domain/entities/institution.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import type {Status, Urgency} from "@/domain/entities/repair-request.ts";
import type {RepairRequestSortBy} from "@/domain/queries/repair-request-list.query.ts";

const filtersFactory = (institutions: Institution[], categories: EquipmentCategory[]): FilterConfig[] => [
    {
        key: 'institutionId',
        options: [
            { value: 'all', label: 'Всі центри' },
            ...institutions.map(x => ({value: x.id, label: x.name})),
        ],
    },
    {
        key: 'categoryId',
        options: [
            { value: 'all', label: 'Всі категорії' },
            ...categories.map(x => ({value: x.id, label: x.name})),
        ],
    },
    {
        key: 'status',
        options: [
            { value: 'all', label: 'Всі статуси' },
            { value: 'not_taken', label: 'Новий' },
            { value: 'waiting_engineer', label: 'Очікує інженера' },
            { value: 'in_progress', label: 'У роботі' },
            { value: 'waiting_spare_parts', label: 'Очікує запчастини' },
            { value: 'finished', label: 'Виконано' },
        ],
    },
    {
        key: 'urgency',
        options: [
            { value: 'all', label: 'Всі пріоритети' },
            { value: 'critical', label: 'Критичний' },
            { value: 'non_critical', label: 'Звичайний' },
        ],
    },
    {
        key: 'sortBy',
        options: [
            { value: 'date', label: 'За датою' },
            { value: 'model', label: 'За моделлю' },
            { value: 'status', label: 'За статусом' },
            { value: 'urgency', label: 'За пріоритетом' },
        ],
    },
];

interface SearchParams extends FiltersPanelValues {
    institutionId: string;
    categoryId: string;
    status: Status | "all";
    sortBy: RepairRequestSortBy;
    urgency: Urgency | "all";
}

export { filtersFactory };
export type { SearchParams };
