import {EngineerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import RepairRequestsTab from "@/presentation/components/tabs/repair-requests/RepairRequestsTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/engineer/dashboard/repair-requests";
import type {Search} from "@/presentation/routes/_authenticated/engineer/dashboard/repair-requests";

const RepairRequestsPage = () => {
    const {page, limit, ...searchParams} = Route.useSearch();
    const navigate = Route.useNavigate();

    const onGoToDetails = (id: string) => {
        navigate({to: "/engineer/dashboard/repair-requests/$repairRequestId", params: {repairRequestId: id} });
    }

    const onSearchChange = (fn: (prev: Search) => Search) => {
        navigate({ search: fn });
    }

    return (
        <EngineerDashboardLayout>
            <RepairRequestsTab
                pagination={{page: +page, limit: +limit}}
                onGoToDetails={onGoToDetails}
                searchParams={searchParams}
                onSearchChange={onSearchChange}
            />
        </EngineerDashboardLayout>
    );
}

export default RepairRequestsPage;