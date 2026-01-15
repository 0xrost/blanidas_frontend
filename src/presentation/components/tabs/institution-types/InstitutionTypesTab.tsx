import type {Pagination} from "@/domain/pagination.ts";
import {Building2} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateInstitutionType, useDeleteInstitutionType,
    useInstitutionTypes,
    useUpdateInstitutionType
} from "@/presentation/hooks/entities/institution-type.ts";
import type {Search} from "@/presentation/routes/_authenticated/manager/dashboard/settings.tsx";
import type {FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";

interface Props {
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: FiltersPanelValues;
}
const InstitutionTypesTab = ({ pagination, onSearchChange, searchParams }: Props) => {
    const config = {
        list: useInstitutionTypes,
        create: useCreateInstitutionType,
        update: useUpdateInstitutionType,
        delete_: useDeleteInstitutionType,
        icon: Building2,
    }

    return (
        <NameOnlyTab
            pagination={pagination}
            config={config}
            onSearchChange={onSearchChange}
            searchParams={searchParams}
        />
    );
}

export default InstitutionTypesTab;
