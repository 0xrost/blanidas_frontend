import type {FilterConfig, FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";
import type {Status} from "@/domain/entities/equipment.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {EquipmentSortBy} from "@/domain/queries/equipment-list.query.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";


interface SearchParams extends FiltersPanelValues {
    institutionId: string | "all";
    modelId: string | "all";
    manufacturerId: string | "all";
    status: Status | "all";
    sortBy: EquipmentSortBy;
}

const filterFieldsFactory = (
    institutions: Institution[],
    models: EquipmentModel[],
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
        key: 'modelId',
        options: [
            { value: 'all', label: 'Всі моделі' },
            ...models.map(x => ({ value: x.id, label: x.name}))
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
            { value: 'manufacturer', label: 'За виробником' },
        ],
    },
];

export { filterFieldsFactory };
export type { SearchParams };