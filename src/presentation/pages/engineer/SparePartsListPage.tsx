import {EngineerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import SparePartsListTab from "@/presentation/components/tabs/spare-parts/SparePartsListTab.tsx";

const SparePartsListPage = () => {
    return (
        <EngineerDashboardLayout>
            <SparePartsListTab />
        </EngineerDashboardLayout>
    )
}

export default SparePartsListPage;