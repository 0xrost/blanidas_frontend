import {DashboardFooter} from "@/presentation/components/layouts/footer.tsx";
import {DashboardHeader} from "@/presentation/components/layouts/header.tsx";
import NavigationTab from "@/presentation/components/layouts/navigation-tab.tsx";
import {ClipboardList, Package} from "lucide-react";
import {useState} from "react";
import RepairRequestListTab from "@/presentation/components/tabs/repair-requests-list/RepairRequestListTab.tsx";


type EngineerDashboardTabs = "repair-requests" | "spare-parts"
const EngineerDashboard = () => {
    const [ currentTab, setCurrentTab ] = useState<EngineerDashboardTabs>("repair-requests");

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
            <DashboardHeader username={"Ivankiw Rostyslaw"} role={"Manager"} showFullLogo={true} onLogout={() => {}}>
                <NavigationTab
                    onClick={() => setCurrentTab("repair-requests")}
                    icon={<ClipboardList className="w-4 h-4" />}
                    isActive={currentTab === "repair-requests"}
                    title={"Заявки"}
                />
                <NavigationTab
                    onClick={() => setCurrentTab("spare-parts")}
                    icon={<Package className="w-4 h-4" />}
                    isActive={currentTab === "spare-parts"}
                    title={"Запчастини"}
                />
            </DashboardHeader>
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                { currentTab === "repair-requests" && <RepairRequestListTab /> }
            </div>
            <DashboardFooter />
        </div>
    );
};

export default EngineerDashboard;