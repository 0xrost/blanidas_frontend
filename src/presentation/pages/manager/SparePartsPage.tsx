import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import SparePartsTab from "@/presentation/components/tabs/spare-parts/SparePartsTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/manager/dashboard/spare-parts.tsx";
import type {Pagination} from "@/domain/pagination.ts";

const SparePartsPage = () => {
    const {page, limit} = Route.useSearch();
    const navigate = Route.useNavigate();

    const onChangeSearch = (search: Pagination) => { navigate({ search: search }); }

    return (
        <ManagerDashboardLayout>
            <SparePartsTab pagination={{page, limit}} onSearchChange={onChangeSearch} />
        </ManagerDashboardLayout>
    )
}

export default SparePartsPage;