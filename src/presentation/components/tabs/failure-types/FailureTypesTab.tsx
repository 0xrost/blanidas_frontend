import type {Pagination} from "@/domain/pagination.ts";
import {AlertTriangle} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateFailureType, useDeleteFailureType,
    useFailureTypes,
    useUpdateFailureType
} from "@/presentation/hooks/entities/failure-type.ts";

interface Props {
    pagination: Pagination;
    onPaginationChange: (pagination: Pagination) => void;
}
const FailureTypesTab = ({ pagination, onPaginationChange }: Props) => {
    const config = {
        list: useFailureTypes,
        create: useCreateFailureType,
        update: useUpdateFailureType,
        delete_: useDeleteFailureType,
        icon: AlertTriangle,
    }

    return (
        <NameOnlyTab pagination={pagination} onPaginationChange={onPaginationChange} config={config} />
    );
}

export default FailureTypesTab;