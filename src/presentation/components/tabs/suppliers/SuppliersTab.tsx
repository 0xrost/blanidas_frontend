import type {Pagination} from "@/domain/pagination.ts";
import {Truck} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateSupplier,
    useDeleteSupplier,
    useSuppliers,
    useUpdateSupplier
} from "@/presentation/hooks/entities/supplier.ts";

interface Props {
    pagination: Pagination;
    onPaginationChange: (pagination: Pagination) => void;
}
const SuppliersTab = ({ pagination, onPaginationChange }: Props) => {
    const config = {
        list: useSuppliers,
        create: useCreateSupplier,
        update: useUpdateSupplier,
        delete_: useDeleteSupplier,
        icon: Truck,
    }

    return (
        <NameOnlyTab pagination={pagination} onPaginationChange={onPaginationChange} config={config} />
    );
}

export default SuppliersTab;