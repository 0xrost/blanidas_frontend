import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestsTab from "@/presentation/components/tabs/repair-requests/RepairRequestsTab.tsx";
import {Route, type Search} from "@/presentation/routes/_authenticated/manager/dashboard/repair-requests";

const RepairRequestsPage = () => {
    const {page, limit, ...searchParams} = Route.useSearch();
    const navigate = Route.useNavigate();

    const onGoToDetails = (id: string) => {
        navigate({to: "/manager/dashboard/repair-requests/$repairRequestId", params: {repairRequestId: id} });
    }

    const onSearchChange = (fn: (prev: Search) => Search) => {
        navigate({ search: fn });
    }

    return (
        <ManagerDashboardLayout>
            <RepairRequestsTab
                pagination={{page: +page, limit: +limit}}
                onGoToDetails={onGoToDetails}
                searchParams={searchParams}
                onSearchChange={onSearchChange}
            />
        </ManagerDashboardLayout>
    );
}

export default RepairRequestsPage;