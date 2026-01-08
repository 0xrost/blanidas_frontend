import type {FilterConfig, FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";
import type {StockStatus} from "@/domain/entities/spare-part.ts";
import type {SparePartSortBy} from "@/domain/queries/spare-part-list.query.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";

interface SearchParams extends FiltersPanelValues {
    institutionId: string;
    sparePartCategoryId: string;
    equipmentModelId: string;
    status: StockStatus | "all";
    sortBy: SparePartSortBy;
}

const filterFieldsFactory = (
    institutions: Institution[],
    categories: SparePartCategory[],
    models: EquipmentModel[],
): FilterConfig[] => [
    {
        key: 'institutionId',
        options: [
            { value: 'all', label: 'Всі центри' },
            ...institutions.map(x => ({ value: x.id, label: x.name })),
        ],
    },
    {
        key: 'sparePartCategoryId',
        options: [
            { value: 'all', label: 'Всі категорії' },
            ...categories.map(x => ({ value: x.id, label: x.name })),
        ],
    },
    {
        key: 'equipmentModelId',
        options: [
            { value: 'all', label: 'Всі моделі' },
            ...models.map(x => ({ value: x.id, label: x.name })),
        ],
    },
    {
        key: 'status',
        options: [
            { value: 'all', label: 'Всі статуси' },
            { value: 'in_stock', label: 'У наявності' },
            { value: 'low_stock', label: 'Низький залишок' },
            { value: 'out_of_stock', label: 'Відсутня' },
        ],
    },
    {
        key: 'sortBy',
        options: [
            { value: 'name', label: 'За назвою' },
            { value: 'quantity', label: 'За кількістю' },
            { value: 'status', label: 'За статусом' },
        ],
    },
];

export { filterFieldsFactory };
export type { SearchParams };