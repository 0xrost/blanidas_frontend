import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import StaffTab from "@/presentation/components/tabs/staff/StaffTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/manager/dashboard/staff.tsx";

const StaffPage = () => {
    const {page, limit} = Route.useSearch();

    return (
        <ManagerDashboardLayout>
            <StaffTab page={page} limit={limit} url={Route.fullPath} />
        </ManagerDashboardLayout>
    );
};

export default StaffPage;