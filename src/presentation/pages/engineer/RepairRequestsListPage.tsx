import {EngineerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestListTab from "@/presentation/components/tabs/repair-requests-list/RepairRequestListTab.tsx";

const RepairRequestsListPage = () => {
    return (
        <EngineerDashboardLayout>
            <RepairRequestListTab />
        </EngineerDashboardLayout>
    );
}

export default RepairRequestsListPage;