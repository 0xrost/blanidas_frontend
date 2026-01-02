import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestDetailsTab from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/manager/dashboard/repair-requests/$repairRequestId.tsx";

const RepairRequestDetailsPage = () => {
    const {repairRequestId} = Route.useParams();

    return (
        <ManagerDashboardLayout>
            <RepairRequestDetailsTab repairRequestId={repairRequestId} />
        </ManagerDashboardLayout>
    );
};

export default RepairRequestDetailsPage;