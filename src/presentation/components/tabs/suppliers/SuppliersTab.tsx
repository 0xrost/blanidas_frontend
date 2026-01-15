import type {Pagination} from "@/domain/pagination.ts";
import {Truck} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateSupplier,
    useDeleteSupplier,
    useSuppliers,
    useUpdateSupplier
} from "@/presentation/hooks/entities/supplier.ts";
import type {Search} from "@/presentation/routes/_authenticated/manager/dashboard/settings.tsx";
import type {FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";

interface Props {
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: FiltersPanelValues;
}
const SuppliersTab = ({ pagination, onSearchChange, searchParams }: Props) => {
    const config = {
        list: useSuppliers,
        create: useCreateSupplier,
        update: useUpdateSupplier,
        delete_: useDeleteSupplier,
        icon: Truck,
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

export default SuppliersTab;