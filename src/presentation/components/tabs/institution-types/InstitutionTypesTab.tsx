import type {Pagination} from "@/domain/pagination.ts";
import {Building2} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateInstitutionType, useDeleteInstitutionType,
    useInstitutionTypes,
    useUpdateInstitutionType
} from "@/presentation/hooks/entities/institution-type.ts";

interface Props {
    pagination: Pagination;
    onPaginationChange: (pagination: Pagination) => void;
}
const InstitutionTypesTab = ({ pagination, onPaginationChange }: Props) => {
    const config = {
        list: useInstitutionTypes,
        create: useCreateInstitutionType,
        update: useUpdateInstitutionType,
        delete_: useDeleteInstitutionType,
        icon: Building2,
    }

    return (
        <NameOnlyTab pagination={pagination} onPaginationChange={onPaginationChange} config={config} />
    );
}

export default InstitutionTypesTab;
