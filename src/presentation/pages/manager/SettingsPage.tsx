import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import SettingsTab from "@/presentation/components/tabs/settings/SettingsTab.tsx";
import {Route, type SearchParams} from "@/presentation/routes/_authenticated/manager/dashboard/settings.tsx";

const SettingsPage = () => {
    const {tab, page, limit} = Route.useSearch();
    const navigate = Route.useNavigate();

    const onChangeSearch = (search: SearchParams) => { navigate({ search: search }); }

    return (
        <ManagerDashboardLayout>
            <SettingsTab tab={tab} pagination={{page, limit}} onSearchChange={onChangeSearch} />
        </ManagerDashboardLayout>
    )
};

export default SettingsPage;