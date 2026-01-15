import {ManagerDashboardLayout} from "@/presentation/components/layouts/DashboardLayout.tsx";
import StatisticsTab from "@/presentation/components/tabs/statistics/StatisticsTab.tsx";

const StatisticsPage = () => {
    return (
        <ManagerDashboardLayout>
            <StatisticsTab />
        </ManagerDashboardLayout>
    )
};

export default StatisticsPage;