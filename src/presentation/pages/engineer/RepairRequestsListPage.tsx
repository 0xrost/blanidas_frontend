import {EngineerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestListTab from "@/presentation/components/tabs/repair-requests-list/RepairRequestListTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/engineer/dashboard/repair-requests";

const RepairRequestsListPage = () => {
    const {page, limit} = Route.useSearch();

    return (
        <EngineerDashboardLayout>
            <RepairRequestListTab
                page={page}
                limit={limit}
                url={Route.path}
                detailsUrl={"/engineer/dashboard/repair-requests/$repairRequestId"}
            />
        </EngineerDashboardLayout>
    );
}

export default RepairRequestsListPage;