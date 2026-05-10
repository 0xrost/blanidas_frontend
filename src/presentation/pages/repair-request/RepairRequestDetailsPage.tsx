import {EngineerDashboardLayout, ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestDetailsTab from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/dashboard/repair-requests/$repairRequestId";
import { useAuthSession } from "@/presentation/hooks/auth";
import { useRouter } from "@tanstack/react-router";
import { defaultSearch } from "@/presentation/routes/_authenticated/dashboard/repair-requests";


const RepairRequestDetailsPage = () => {
    const {repairRequestId} = Route.useParams();
    const router = useRouter();
    const session = useAuthSession();
    
    const goToDashboard = () => { 
        router.history.length > 1 ? 
            router.history.back() : 
            router.navigate({to: "/dashboard/repair-requests", search: { ...defaultSearch, page: "1", limit: "15" }}) 
    };
    const goToRepairRequest = (id: string) => { router.navigate({to: "/dashboard/repair-requests/$repairRequestId", params: {repairRequestId: id}}) }
    const Layout = session?.currentUser.role == "engineer" ? EngineerDashboardLayout : ManagerDashboardLayout;

    return (
        <Layout>
            <RepairRequestDetailsTab
                repairRequestId={repairRequestId}
                goToDashboard={goToDashboard}
                goToRepairRequest={goToRepairRequest}
            />
        </Layout>
    );
};

export default RepairRequestDetailsPage;