import {EngineerDashboardLayout, ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestDetailsTab from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/dashboard/repair-requests/$repairRequestId";
import {defaultSearch} from "@/presentation/routes/_authenticated/dashboard/repair-requests";
import { useAuthSession } from "@/presentation/hooks/auth";


const RepairRequestDetailsPage = () => {
    const {repairRequestId} = Route.useParams();
    const navigate = Route.useNavigate();
    const session = useAuthSession();
    
    const goToDashboard = () => { navigate({to: "/dashboard/repair-requests", search: {...defaultSearch, page: "1", limit: "15"}}); }
    const Layout = session?.currentUser.role == "engineer" ? EngineerDashboardLayout : ManagerDashboardLayout;

    return (
        <Layout>
            <RepairRequestDetailsTab
                repairRequestId={repairRequestId}
                goToDashboard={goToDashboard}
            />
        </Layout>
    );
};

export default RepairRequestDetailsPage;