import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import SparePartsListTab from "@/presentation/components/tabs/spare-parts/SparePartsListTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/manager/dashboard/spare-parts.tsx";

const SparePartsListPage = () => {
    const {page, limit} = Route.useSearch();

    return (
        <ManagerDashboardLayout>
            <SparePartsListTab page={page} limit={limit} url={Route.path} />
        </ManagerDashboardLayout>
    )
}

export default SparePartsListPage;