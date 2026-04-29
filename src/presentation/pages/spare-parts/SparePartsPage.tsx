import {EngineerDashboardLayout, ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import SparePartsTab from "@/presentation/components/tabs/spare-parts/SparePartsTab.tsx";
import { useAuthSession } from "@/presentation/hooks/auth";
import {Route} from "@/presentation/routes/_authenticated/dashboard/spare-parts";
import type {Search} from "@/presentation/routes/_authenticated/dashboard/spare-parts";

const SparePartsPage = () => {
    const {page, limit, ...searchParams} = Route.useSearch();
    const navigate = Route.useNavigate();
    const session = useAuthSession();

    const onSearchChange = (fn: (prev: Search) => Search) => {
        navigate({ search: fn });
    }

    const Layout = session?.currentUser.role == "engineer" ? EngineerDashboardLayout : ManagerDashboardLayout;

    return (
        <Layout>
            <SparePartsTab
                pagination={{page: +page, limit: +limit}}
                onSearchChange={onSearchChange}
                searchParams={searchParams}
            />
        </Layout>
    )
}

export default SparePartsPage;