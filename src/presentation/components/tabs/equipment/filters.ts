import type {FilterConfig, FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";
import type {Status} from "@/domain/entities/equipment.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {EquipmentSortBy} from "@/domain/queries/equipment-list.query.ts";


const filtersFactory = (
    institutions: Institution[],
    categories: EquipmentCategory[],
    manufacturers: Manufacturer[],
): FilterConfig[] => [
    {
        key: 'institutionId',
        options: [
            { value: 'all', label: 'Всі центри' },
            ...institutions.map(x => ({ value: x.id, label: x.name}))
        ],
    },
    {
        key: 'categoryId',
        options: [
            { value: 'all', label: 'Всі категорії' },
            ...categories.map(x => ({ value: x.id, label: x.name}))
        ],
    },
    {
        key: 'manufacturerId',
        options: [
            { value: 'all', label: 'Всі виробники' },
            ...manufacturers.map(x => ({ value: x.id, label: x.name}))
        ],
    },
    {
        key: 'status',
        options: [
            { value: 'all', label: 'Всі статуси' },
            { value: 'working', label: 'Робоче' },
            { value: 'under_maintenance', label: 'На обслуговуванні' },
            { value: 'not_working', label: 'Не працює' },
        ],
    },
    {
        key: 'sortBy',
        options: [
            { value: 'name', label: 'За назвою' },
            { value: 'institution', label: 'За закладом' },
            { value: 'category', label: 'За категорією' },
            { value: 'manufacturer', label: 'За виробником' },
        ],
    },
];

interface SearchParams extends FiltersPanelValues {
    institutionId: string | "all";
    categoryId: string | "all";
    manufacturerId: string | "all";
    status: Status | "all";
    sortBy: EquipmentSortBy;
}

export { filtersFactory };
export type { SearchParams };