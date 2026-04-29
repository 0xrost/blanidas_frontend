import type {Pagination} from "@/domain/pagination.ts";
import {AlertTriangle} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateFailureType, useDeleteFailureType,
    useFailureTypes,
    useUpdateFailureType
} from "@/presentation/hooks/entities/failure-type.ts";
import type {Search} from "@/presentation/routes/_authenticated/dashboard/manager/settings";
import type {FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";

interface Props {
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: FiltersPanelValues;
}
const FailureTypesTab = ({ pagination, searchParams, onSearchChange }: Props) => {
    const config = {
        list: useFailureTypes,
        create: useCreateFailureType,
        update: useUpdateFailureType,
        delete_: useDeleteFailureType,
        icon: AlertTriangle,
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

export default FailureTypesTab;