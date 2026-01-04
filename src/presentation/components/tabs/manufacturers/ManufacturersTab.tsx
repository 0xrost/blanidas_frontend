import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateManufacturer, useDeleteManufacturer,
    useManufacturers,
    useUpdateManufacturer
} from "@/presentation/hooks/entities/manufacturer.ts";
import {Factory} from "lucide-react";
import type {Pagination} from "@/domain/pagination.ts";


interface Props {
    pagination: Pagination;
    onPaginationChange: (pagination: Pagination) => void;
}
const ManufacturersTab = ({ pagination, onPaginationChange }: Props) => {
    const config = {
        list: useManufacturers,
        create: useCreateManufacturer,
        update: useUpdateManufacturer,
        delete_: useDeleteManufacturer,
        icon: Factory,
    }

    return (
        <NameOnlyTab pagination={pagination} onPaginationChange={onPaginationChange} config={config} />
    );
}

export default ManufacturersTab;