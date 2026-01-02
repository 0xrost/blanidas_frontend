import {EngineerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestDetailsTab from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/engineer/dashboard/repair-requests/$repairRequestId.tsx";

const RepairRequestDetailsPage = () => {
    const {repairRequestId} = Route.useParams();

    return (
        <EngineerDashboardLayout>
            <RepairRequestDetailsTab repairRequestId={repairRequestId} />
        </EngineerDashboardLayout>
    );
};

export default RepairRequestDetailsPage;