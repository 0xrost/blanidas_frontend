import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import SettingsTab from "@/presentation/components/tabs/settings/SettingsTab.tsx";
import {Route, type Search} from "@/presentation/routes/_authenticated/manager/settings";

const SettingsPage = () => {
    const {page, limit, tab, ...searchParams} = Route.useSearch();
    const navigate = Route.useNavigate();

    const onSearchChange = (fn: (prev: Search) => Search) => {
        navigate({ search: fn });
    }

    return (
        <ManagerDashboardLayout>
            <SettingsTab
                tab={tab}
                pagination={{page: +page, limit: +limit}}
                onSearchChange={onSearchChange}
                searchParams={searchParams}
            />
        </ManagerDashboardLayout>
    )
};

export default SettingsPage;