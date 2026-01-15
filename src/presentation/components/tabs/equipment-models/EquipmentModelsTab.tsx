import {Monitor} from "lucide-react";
import NameOnlyTab from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import {
    useCreateEquipmentModel, useDeleteEquipmentModel,
    useEquipmentModels,
    useUpdateEquipmentModel
} from "@/presentation/hooks/entities/equipment-model.ts";
import type {Pagination} from "@/domain/pagination.ts";
import type {Search} from "@/presentation/routes/_authenticated/manager/dashboard/settings.tsx";
import type {FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";


interface Props {
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: FiltersPanelValues;
}
const EquipmentModelsTab = ({ pagination, onSearchChange, searchParams }: Props) => {
    const config = {
        list: useEquipmentModels,
        create: useCreateEquipmentModel,
        update: useUpdateEquipmentModel,
        delete_: useDeleteEquipmentModel,
        icon: Monitor,
    }

    return (
        <NameOnlyTab
            pagination={pagination}
            config={config}
            onSearchChange={onSearchChange}
            searchParams={searchParams}
        />
    );
};

export default EquipmentModelsTab;