import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateManufacturer, useDeleteManufacturer,
    useManufacturers,
    useUpdateManufacturer
} from "@/presentation/hooks/entities/manufacturer.ts";
import {Factory} from "lucide-react";
import type {Pagination} from "@/domain/pagination.ts";
import type {Search} from "@/presentation/routes/_authenticated/dashboard/manager/settings";
import type {FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";


interface Props {
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: FiltersPanelValues;
}
const ManufacturersTab = ({ pagination, onSearchChange, searchParams }: Props) => {
    const config = {
        list: useManufacturers,
        create: useCreateManufacturer,
        update: useUpdateManufacturer,
        delete_: useDeleteManufacturer,
        icon: Factory,
    }

    return (
        <NameOnlyTab
            pagination={pagination}
            searchParams={searchParams}
            onSearchChange={onSearchChange}
            config={config} />
    );
}

export default ManufacturersTab;