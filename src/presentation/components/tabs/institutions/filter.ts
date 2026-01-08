import type {FilterConfig, FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";
import type {InstitutionType} from "@/domain/entities/institution-type.ts";


interface SearchParams extends FiltersPanelValues { typeId: string | "all"; }

const filterFieldsFactory = (types: InstitutionType[]): FilterConfig => ({
    key: 'typeId',
    options: [
        { value: 'all', label: 'Усі типи' },
        ...types.map(x => ({ value: x.id, label: x.name })),
    ],
});

export { filterFieldsFactory };
export type { SearchParams };