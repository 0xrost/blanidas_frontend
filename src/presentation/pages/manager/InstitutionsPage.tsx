import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import {Route} from "@/presentation/routes/_authenticated/manager/dashboard/institutions.tsx";
import InstitutionsTab from "@/presentation/components/tabs/institutions/InstitutionsTab.tsx";

const InstitutionsPage = () => {
    const {page, limit} = Route.useSearch();

    return (
        <ManagerDashboardLayout>
            <InstitutionsTab page={page} limit={limit} url={Route.fullPath} />
        </ManagerDashboardLayout>
    );
};
export default InstitutionsPage;