import SelectionCard, {selectionCardConfig} from "@/presentation/components/tabs/settings/SelectionCard.tsx";
import StaffTab from "@/presentation/components/tabs/staff/StaffTab.tsx";
import InstitutionsTab from "@/presentation/components/tabs/institutions/InstitutionsTab.tsx";
import type {Search, SearchParams} from "@/presentation/routes/_authenticated/manager/settings";
import type {Pagination} from "@/domain/pagination.ts";
import ManufacturersTab from "@/presentation/components/tabs/manufacturers/ManufacturersTab.tsx";
import SparePartCategoryTab from "@/presentation/components/tabs/spare-part-categories/SparePartCategoryTab.tsx";
import EquipmentModelsTab from "@/presentation/components/tabs/equipment-models/EquipmentModelsTab.tsx";
import FailureTypesTab from "@/presentation/components/tabs/failure-types/FailureTypesTab.tsx";
import EquipmentCategoriesTab from "@/presentation/components/tabs/equipment-categories/EquipmentCategoriesTab.tsx";
import {useOnSetValue} from "@/presentation/hooks/useOnSetValue.ts";

type Tab =
    | "institutions"
    | "staff"
    | "sparePartCategories"
    | "equipmentModels"
    | "failureTypes"
    | "equipmentCategories"
    | "manufacturers"


interface Props {
    tab: Tab;
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: SearchParams;
}
const SettingsTab = ({ tab, onSearchChange, searchParams, pagination }: Props) => {
    const onSetValue = useOnSetValue(onSearchChange);

    const tabs: Record<Tab, React.ReactNode> = {
        staff:  <StaffTab pagination={pagination} searchParams={searchParams} onSearchChange={onSearchChange} />,
        institutions: <InstitutionsTab pagination={pagination} searchParams={searchParams} onSearchChange={onSearchChange} />,
        manufacturers: <ManufacturersTab pagination={pagination} searchParams={searchParams} onSearchChange={onSearchChange} />,
        sparePartCategories: <SparePartCategoryTab pagination={pagination} searchParams={searchParams} onSearchChange={onSearchChange} />,
        equipmentModels: <EquipmentModelsTab pagination={pagination} searchParams={searchParams} onSearchChange={onSearchChange} />,
        failureTypes: <FailureTypesTab pagination={pagination} searchParams={searchParams} onSearchChange={onSearchChange} />,
        equipmentCategories: <EquipmentCategoriesTab pagination={pagination} searchParams={searchParams} onSearchChange={onSearchChange} />,
    };

    const onChangeTab = (id: Tab) => {
        onSetValue("tab", id);
        onSetValue("search", "");
    }

    return (
        <div className="space-y-6">
            <SelectionCard
                currentTabId={tab}
                setCurrentTabId={onChangeTab}
                selectionConfig={selectionCardConfig}
            />

            { tabs[tab] }
        </div>
    );
};

export default SettingsTab;
export type { Tab };