import {EngineerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestDetailsTab from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";

const RepairRequestDetailsPage = () => {
    return (
        <EngineerDashboardLayout>
            <RepairRequestDetailsTab />
        </EngineerDashboardLayout>
    );
};

export default RepairRequestDetailsPage;