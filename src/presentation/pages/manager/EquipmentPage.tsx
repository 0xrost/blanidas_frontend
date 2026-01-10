import {Route} from "@/presentation/routes/_authenticated/manager/dashboard/equipment.tsx";
import type {Pagination} from "@/domain/pagination.ts";
import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import EquipmentTab from "@/presentation/components/tabs/equipment/EquipmentTab.tsx";

const EquipmentPage = () => {
    const {page, limit} = Route.useSearch();
    const navigate = Route.useNavigate();

    const onSearchChange = (search: Pagination) => { navigate({ search: search }); }

    return (
        <ManagerDashboardLayout>
            <EquipmentTab pagination={{page, limit}} onSearchChange={onSearchChange} />
        </ManagerDashboardLayout>
    )
};

export default EquipmentPage;