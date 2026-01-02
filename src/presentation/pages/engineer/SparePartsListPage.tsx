import {EngineerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import SparePartsListTab from "@/presentation/components/tabs/spare-parts/SparePartsListTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/engineer/dashboard/spare-parts";

const SparePartsListPage = () => {
    const {page, limit} = Route.useSearch();
    return (
        <EngineerDashboardLayout>
            <SparePartsListTab page={page} limit={limit} url={Route.path} />
        </EngineerDashboardLayout>
    )
}

export default SparePartsListPage;