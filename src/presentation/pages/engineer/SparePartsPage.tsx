import {EngineerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import SparePartsTab from "@/presentation/components/tabs/spare-parts/SparePartsTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/engineer/dashboard/spare-parts";
import type {Search} from "@/presentation/routes/_authenticated/engineer/dashboard/spare-parts.tsx";

const SparePartsPage = () => {
    const {page, limit, ...searchParams} = Route.useSearch();
    const navigate = Route.useNavigate();

    const onSearchChange = (fn: (prev: Search) => Search) => {
        navigate({ search: fn });
    }

    return (
        <EngineerDashboardLayout>
            <SparePartsTab
                pagination={{page: +page, limit: +limit}}
                onSearchChange={onSearchChange}
                searchParams={searchParams}
            />
        </EngineerDashboardLayout>
    )
}

export default SparePartsPage;