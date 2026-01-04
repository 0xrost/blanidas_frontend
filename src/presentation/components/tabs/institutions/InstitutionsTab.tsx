import { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import FiltersPanel, { type FiltersPanelValues } from "@/presentation/components/layouts/FiltersPanel.tsx";
import { Button } from "@/presentation/components/ui/button.tsx";
import { useInstitutionTypes } from "@/presentation/hooks/entities/institution-type.ts";
import {type Pagination, UnlimitedPagination} from "@/domain/pagination.ts";
import { SortByNameAsc } from "@/domain/sorting.ts";
import InstitutionTable from "@/presentation/components/tabs/institutions/InstitutionTable.tsx";
import {
    useCreateInstitution,
    useUpdateInstitution,
    useDeleteInstitution,
    useInstitutions
} from "@/presentation/hooks/entities/institution.ts";
import {
    institutionFields,
    type InstitutionFormData
} from "@/presentation/components/tabs/institutions/institutionModal.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import type { Institution } from "@/domain/entities/institution.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {useHandleMutation} from "@/presentation/hooks/useHandleMutation.ts";

const emptyInlineFilter = {
    key: 'typeId',
    options: [{ value: 'all', label: 'Усі типи' }],
};

interface SearchParams extends FiltersPanelValues { typeId: string | "all"; }

const emptyFormData: InstitutionFormData = {
    name: "",
    address: "",
    typeId: "",
    contactPhone: "",
    contactEmail: "",
};

interface Props {
    pagination: Pagination;
    onChange: (pagination: Pagination) => void;
}

const InstitutionsTab = ({ pagination, onChange }: Props) => {
    const [values, setValues] = useState<SearchParams>({ search: "", typeId: "all", sortOrder: "asc" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localInstitutions, setLocalInstitutions] = useState<Institution[]>([]);

    const { data: institutionTypesPagination } = useInstitutionTypes({ pagination: UnlimitedPagination, sorting: SortByNameAsc });
    const { data: institutionsPagination } = useInstitutions({
        pagination,
        filters: {
            nameOrAddress: values.search.trim().length < 2 ? undefined : values.search.trim(),
            typeId: values.typeId === "all" ? undefined : values.typeId,
        },
        sorting: { sortBy: "name", sortOrder: values.sortOrder }
    });

    const createInstitution = useCreateInstitution();
    const updateInstitution = useUpdateInstitution();
    const deleteInstitution = useDeleteInstitution();

    const modalFields = useMemo(
        () => institutionFields(institutionTypesPagination?.items ?? []),
        [institutionTypesPagination]
    );

    const inlineFilter = useMemo(() => {
        if (!institutionTypesPagination) return emptyInlineFilter;
        return {
            ...emptyInlineFilter,
            options: [
                emptyInlineFilter.options[0],
                ...institutionTypesPagination.items.map(({ id, name }) => ({ value: id, label: name }))
            ]
        };
    }, [institutionTypesPagination]);

    useEffect(() => {
        if (institutionsPagination) setLocalInstitutions(institutionsPagination.items);
    }, [institutionsPagination]);

    const onCreate = useHandleMutation(createInstitution, (data: Institution) =>
        setLocalInstitutions(prev => [data, ...prev])
    );

    const onUpdate = useHandleMutation(updateInstitution, (data: Institution) =>
        setLocalInstitutions(prev => prev.map(x => x.id === data.id ? data : x))
    );

    const onDelete = useHandleMutation(deleteInstitution, (id: string) => {
        if (id) setLocalInstitutions(prev => prev.filter(x => x.id !== id));
    });

    const createButton = (
        <Button
            onClick={() => setIsModalOpen(true)}
            className="px-4! h-12 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-2"
        >
            <Plus className="w-8 h-8" />
            Додати заклад
        </Button>
    );

    return (
        <div className="space-y-6">
            <FiltersPanel
                values={values}
                inlineFilter={inlineFilter}
                actionButton={createButton}
                searchPlaceholder="Пошук за назвою або адресою закладу"
                setValues={(key, value) => setValues(prev => ({ ...prev, [key]: value }))}
            />

            <InstitutionTable
                institutions={localInstitutions}
                institutionTypes={institutionTypesPagination?.items ?? []}
                update={onUpdate}
                delete_={onDelete}
            />

            <FormModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title="Додати заклад"
                description="Внесіть інформацію про новий заклад"
                initialValues={emptyFormData}
                submit={onCreate}
                fields={modalFields}
                errorText="Не вдалося додати нового працівника"
                submitText="Додати"
            />

            <PaginationControl
                onChange={onChange}
                items={localInstitutions.length}
                pagination={pagination}
            />
        </div>
    );
};

export default InstitutionsTab;
