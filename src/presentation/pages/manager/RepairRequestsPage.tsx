import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestsTab from "@/presentation/components/tabs/repair-requests/RepairRequestsTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/manager/dashboard/repair-requests";
import type {Pagination} from "@/domain/pagination.ts";

const RepairRequestsPage = () => {
    const {page, limit} = Route.useSearch();

    const navigate = Route.useNavigate();

    const onPaginationChange = (pagination: Pagination) => { navigate({ search: pagination }); };
    const onGoToDetails = (id: string) => {
        navigate({to: "/manager/dashboard/repair-requests/$repairRequestId", params: {repairRequestId: id} });
    }

    return (
        <ManagerDashboardLayout>
            <RepairRequestsTab
                pagination={{page, limit}}
                onPaginationChange={onPaginationChange}
                onGoToDetails={onGoToDetails}
            />
        </ManagerDashboardLayout>
    );
}

export default RepairRequestsPage;