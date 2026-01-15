import {Route, type Search} from "@/presentation/routes/_authenticated/manager/dashboard/equipment.tsx";
import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import EquipmentTab from "@/presentation/components/tabs/equipment/EquipmentTab.tsx";

const EquipmentPage = () => {
    const {page, limit, ...searchParams} = Route.useSearch();
    const navigate = Route.useNavigate();

    const onSearchChange = (fn: (prev: Search) => Search) => {
        navigate({ search: fn });
    }

    return (
        <ManagerDashboardLayout>
            <EquipmentTab
                pagination={{page: +page, limit: +limit}}
                onSearchChange={onSearchChange}
                searchParams={searchParams}
            />
        </ManagerDashboardLayout>
    )
};

export default EquipmentPage;