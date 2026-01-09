import { useState, useEffect, useMemo } from "react";
import FiltersPanel from "@/presentation/components/layouts/FiltersPanel.tsx";
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
import {modalFieldsFactory} from "@/presentation/components/tabs/institutions/modal.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import type { Institution } from "@/domain/entities/institution.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {useHandleMutation} from "@/presentation/hooks/useHandleMutation.ts";
import {filterFieldsFactory, type SearchParams} from "@/presentation/components/tabs/institutions/filter.ts";
import AddButton from "@/presentation/components/layouts/AddButton.tsx";

interface Props {
    pagination: Pagination;
    onChange: (pagination: Pagination) => void;
}

const errorMessages = {
    name: "Заклад з такою назвою вже існує, оберіть іншу.",
    create: "Не вдалося створити заклад. Спробуйте ще раз пізніше.",
    delete: "Не вдалося видалити заклад. Спробуйте ще раз пізніше.",
    update: "Не вдалося оновити інформацію про заклад. Спробуйте ще раз пізніше."
}

const InstitutionsTab = ({ pagination, onChange }: Props) => {
    const [values, setValues] = useState<SearchParams>({ search: "", typeId: "all", sortOrder: "asc" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localInstitutions, setLocalInstitutions] = useState<Institution[]>([]);
    const [creatingError, setCreatingError] = useState<string | null>(null);

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
        () => modalFieldsFactory(institutionTypesPagination?.items ?? []),
    [institutionTypesPagination]);

    const inlineFilter = useMemo(
        () => filterFieldsFactory(institutionTypesPagination?.items ?? []),
    [institutionTypesPagination]);

    useEffect(() => {
        if (institutionsPagination) setLocalInstitutions(institutionsPagination.items);
    }, [institutionsPagination]);

    const onCreate = useHandleMutation(createInstitution,
        (data: Institution) => {
            setLocalInstitutions(prev => [data, ...prev]);
            setCreatingError(null);
        },
        (error) =>  { setCreatingError(
            error?.code == "value already exists" && error.fields == "name"
                ? errorMessages.name
                : errorMessages.create
        );}
    );

    const onUpdate = useHandleMutation(updateInstitution, (data: Institution) =>
        setLocalInstitutions(prev => prev.map(x => x.id === data.id ? data : x))
    );

    const onDelete = useHandleMutation(deleteInstitution, (id: string) => {
        setLocalInstitutions(prev => prev.filter(x => x.id !== id));
    });

    return (
        <div className="space-y-6">
            <FiltersPanel
                values={values}
                inlineFilter={inlineFilter}
                actionButton={<AddButton onClick={() => setIsModalOpen(true)} title="Додати заклад" />}
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
                submit={onCreate}
                submitText="Додати"
                fields={modalFields}
                errors={creatingError ? [creatingError] : []}
                initialValues={{
                    name: "",
                    address: "",
                    typeId: "",
                    contactPhone: "",
                    contactEmail: "",
                }}
            />

            <PaginationControl
                onChange={onChange}
                items={institutionsPagination?.total ?? 0}
                pagination={pagination}
            />
        </div>
    );
};

export default InstitutionsTab;
export { errorMessages };
