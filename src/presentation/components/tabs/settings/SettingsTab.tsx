import SelectionCard, {selectionCardConfig} from "@/presentation/components/tabs/settings/SelectionCard.tsx";
import StaffTab from "@/presentation/components/tabs/staff/StaffTab.tsx";
import InstitutionsTab from "@/presentation/components/tabs/institutions/InstitutionsTab.tsx";
import type {SearchParams} from "@/presentation/routes/_authenticated/manager/dashboard/settings.tsx";
import type {Pagination} from "@/domain/pagination.ts";
import SuppliersTab from "@/presentation/components/tabs/suppliers/SuppliersTab.tsx";
import ManufacturersTab from "@/presentation/components/tabs/manufacturers/ManufacturersTab.tsx";
import SparePartCategoryTab from "@/presentation/components/tabs/spare-part-categories/SparePartCategoryTab.tsx";
import EquipmentModelsTab from "@/presentation/components/tabs/equipment-models/EquipmentModelsTab.tsx";
import FailureTypesTab from "@/presentation/components/tabs/failure-types/FailureTypesTab.tsx";
import InstitutionTypesTab from "@/presentation/components/tabs/institution-types/InstitutionTypesTab.tsx";
import EquipmentCategoriesTab from "@/presentation/components/tabs/equipment-categories/EquipmentCategoriesTab.tsx";

type Tab =
    | "institutions"
    | "staff"
    | "sparePartCategories"
    | "equipmentModels"
    | "failureTypes"
    | "institutionTypes"
    | "equipmentCategories"
    | "manufacturers"
    | "suppliers";


interface Props {
    tab: Tab;
    pagination: Pagination;
    onSearchChange: (params: SearchParams) => void;
}
const SettingsTab = ({ tab, onSearchChange, pagination }: Props) => {
    const changeTab = (id: Tab) => { onSearchChange({tab: id, ...pagination}) }
    const onChangePagination = (pagination: Pagination) => onSearchChange({...pagination, tab});

    const tabs: Record<Tab, React.ReactNode> = {
        staff:  <StaffTab pagination={pagination} onChange={onChangePagination} />,
        institutions: <InstitutionsTab pagination={pagination} onChange={onChangePagination} />,
        manufacturers: <ManufacturersTab pagination={pagination} onPaginationChange={onChangePagination} />,
        sparePartCategories: <SparePartCategoryTab pagination={pagination} onPaginationChange={onChangePagination} />,
        equipmentModels: <EquipmentModelsTab pagination={pagination} onPaginationChange={onChangePagination} />,
        failureTypes: <FailureTypesTab pagination={pagination} onPaginationChange={onChangePagination} />,
        institutionTypes: <InstitutionTypesTab pagination={pagination} onPaginationChange={onChangePagination} />,
        equipmentCategories: <EquipmentCategoriesTab pagination={pagination} onPaginationChange={onChangePagination} />,
        suppliers: <SuppliersTab pagination={pagination} onPaginationChange={onChangePagination} />,
    };

    return (
        <div className="space-y-6">
            <SelectionCard
                currentTabId={tab}
                setCurrentTabId={changeTab}
                selectionConfig={selectionCardConfig}
            />

            { tabs[tab] }
        </div>
    );
};

export default SettingsTab;
export type { Tab };