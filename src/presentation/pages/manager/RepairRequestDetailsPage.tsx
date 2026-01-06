import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestDetailsTab from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/manager/dashboard/repair-requests/$repairRequestId.tsx";

const RepairRequestDetailsPage = () => {
    const {repairRequestId} = Route.useParams();
    const navigate = Route.useNavigate();

    const goToEngineerDashboard = () => { navigate({to: "/engineer/dashboard/repair-requests", search: {page: 1, limit: 15}}); }
    const goToManagerDashboard = () => { navigate({to: "/manager/dashboard/repair-requests", search: {page: 1, limit: 15}}); }

    return (
        <ManagerDashboardLayout>
            <RepairRequestDetailsTab
                repairRequestId={repairRequestId}
                goToEngineerDashboard={goToEngineerDashboard}
                goToManagerDashboard={goToManagerDashboard}
            />
        </ManagerDashboardLayout>
    );
};

export default RepairRequestDetailsPage;