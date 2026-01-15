import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import SparePartsTab from "@/presentation/components/tabs/spare-parts/SparePartsTab.tsx";
import {Route, type Search} from "@/presentation/routes/_authenticated/manager/dashboard/spare-parts.tsx";

const SparePartsPage = () => {
    const {page, limit, ...searchParams} = Route.useSearch();
    const navigate = Route.useNavigate();

    const onSearchChange = (fn: (prev: Search) => Search) => {
        navigate({ search: fn });
    }

    return (
        <ManagerDashboardLayout>
            <SparePartsTab
                pagination={{page: +page, limit: +limit}}
                onSearchChange={onSearchChange}
                searchParams={searchParams}
            />
        </ManagerDashboardLayout>
    )
}

export default SparePartsPage;