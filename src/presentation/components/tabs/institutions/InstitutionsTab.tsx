import { useState, useEffect, useMemo } from "react";
import FiltersPanel, {type FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";
import {type Pagination} from "@/domain/pagination.ts";
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
import AddButton from "@/presentation/components/layouts/AddButton.tsx";
import {useOnSetValue} from "@/presentation/hooks/useOnSetValue.ts";
import {useOnPaginationChange} from "@/presentation/hooks/useOnPaginationChange.ts";
import type {Search} from "@/presentation/routes/_authenticated/manager/dashboard/settings.tsx";

interface Props {
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: FiltersPanelValues;
}

const errorMessages = {
    name: "Заклад з такою назвою вже існує, оберіть іншу.",
    create: "Не вдалося створити заклад. Спробуйте ще раз пізніше.",
    delete: "Не вдалося видалити заклад. Спробуйте ще раз пізніше.",
    update: "Не вдалося оновити інформацію про заклад. Спробуйте ще раз пізніше."
}

const InstitutionsTab = ({ pagination, onSearchChange, searchParams }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localInstitutions, setLocalInstitutions] = useState<Institution[]>([]);
    const [creatingError, setCreatingError] = useState<string | null>(null);

    const onSetValue = useOnSetValue(onSearchChange);
    const onPaginationChange = useOnPaginationChange(onSearchChange);

    const { data: institutionsPagination } = useInstitutions({
        pagination,
        filters: { nameOrAddress: searchParams.search.trim().length < 2 ? undefined : searchParams.search.trim(), },
        sorting: { sortBy: "name", sortOrder: searchParams.sortOrder }
    });

    const createInstitution = useCreateInstitution();
    const updateInstitution = useUpdateInstitution();
    const deleteInstitution = useDeleteInstitution();

    const modalFields = useMemo(() => modalFieldsFactory(), []);

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
                values={searchParams}
                actionButton={<AddButton onClick={() => setIsModalOpen(true)} title="Додати заклад" />}
                searchPlaceholder="Пошук за назвою або адресою закладу"
                setValues={onSetValue}
            />

            <InstitutionTable
                institutions={localInstitutions}
                update={onUpdate}
                delete_={onDelete}
            />

            <FormModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title="Додати заклад"
                description="Внесіть інформацію про новий заклад"
                submit={onCreate}
                submitText="Додати заклад"
                fields={modalFields}
                errors={creatingError ? [creatingError] : []}
                initialValues={{
                    name: "",
                    address: "",
                    contactPhone: "",
                    contactEmail: "",
                    is_default: false,
                }}
            />

            <PaginationControl
                onChange={onPaginationChange}
                items={institutionsPagination?.total ?? 0}
                pagination={pagination}
            />
        </div>
    );
};

export default InstitutionsTab;
export { errorMessages };
