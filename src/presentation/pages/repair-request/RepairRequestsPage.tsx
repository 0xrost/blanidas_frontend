import {EngineerDashboardLayout, ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestsTab from "@/presentation/components/tabs/repair-requests/RepairRequestsTab.tsx";
import { useAuthSession } from "@/presentation/hooks/auth";
import {Route} from "@/presentation/routes/_authenticated/dashboard/repair-requests";
import type {Search} from "@/presentation/routes/_authenticated/dashboard/repair-requests";

const RepairRequestsPage = () => {
    const {page, limit, ...searchParams} = Route.useSearch();
    const navigate = Route.useNavigate();
    const session = useAuthSession();

    const onGoToDetails = (id: string) => {
        navigate({to: "/dashboard/repair-requests/$repairRequestId", params: {repairRequestId: id} });
    }

    const onSearchChange = (fn: (prev: Search) => Search) => {
        navigate({ search: fn });
    }

    const Layout = session?.currentUser.role == "engineer" ? EngineerDashboardLayout : ManagerDashboardLayout;


    return (
        <Layout>
            <RepairRequestsTab
                pagination={{page: +page, limit: +limit}}
                onGoToDetails={onGoToDetails}
                searchParams={searchParams}
                onSearchChange={onSearchChange}
            />
        </Layout>
    );
}

export default RepairRequestsPage;