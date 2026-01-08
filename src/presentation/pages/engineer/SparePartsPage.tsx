import {EngineerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import SparePartsTab from "@/presentation/components/tabs/spare-parts/SparePartsTab.tsx";
import {Route} from "@/presentation/routes/_authenticated/engineer/dashboard/spare-parts";
import type {Pagination} from "@/domain/pagination.ts";

const SparePartsPage = () => {
    const {page, limit} = Route.useSearch();
    const navigate = Route.useNavigate();

    const onChangeSearch = (search: Pagination) => { navigate({ search: search }); }

    return (
        <EngineerDashboardLayout>
            <SparePartsTab pagination={{page, limit}} onSearchChange={onChangeSearch} />
        </EngineerDashboardLayout>
    )
}

export default SparePartsPage;