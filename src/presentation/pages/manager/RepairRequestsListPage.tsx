import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestListTab from "@/presentation/components/tabs/repair-requests-list/RepairRequestListTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/manager/dashboard/repair-requests";

const RepairRequestsListPage = () => {
    const {page, limit} = Route.useSearch();

    return (
        <ManagerDashboardLayout>
            <RepairRequestListTab
                page={page}
                limit={limit}
                url={Route.path}
                detailsUrl={"/manager/dashboard/repair-requests/$repairRequestId"}
            />
        </ManagerDashboardLayout>
    );
}

export default RepairRequestsListPage;