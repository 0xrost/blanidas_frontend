import {DashboardHeader} from "@/presentation/components/layouts/Header.tsx";
import NavigationTab from "@/presentation/components/layouts/NavigationTab.tsx";
import {ClipboardList, type LucideIcon, Package} from "lucide-react";
import {DashboardFooter} from "@/presentation/components/layouts/Footer.tsx";
import {useAuthSession, useLogout} from "@/presentation/hooks/auth.ts";
import {useLocation} from "@tanstack/react-router";

type DashboardLayoutTab = {
    title: string;
    icon: LucideIcon;
    url: string;
}

type DashboardLayoutProps = {
    children: React.ReactNode;
    showFullLogo: boolean;
    tabs: DashboardLayoutTab[];
}

const DashboardLayout = ({ children, showFullLogo, tabs }: DashboardLayoutProps) => {
    const session = useAuthSession();
    const logout = useLogout()
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
            <DashboardHeader username={session?.currentUser.username ?? ""} role={session?.currentUser.role ?? "engineer"} showFullLogo={showFullLogo} onLogout={logout}>
                {
                    tabs.map(tab =>
                        <NavigationTab key={tab.url} to={tab.url} icon={tab.icon} isActive={location.pathname === tab.url} title={tab.title}/>
                    )
                }
            </DashboardHeader>
            <div className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                { children }
            </div>
            <DashboardFooter />
        </div>
    );
};


const EngineerDashboardLayoutTabs: DashboardLayoutTab[] = [
    {
        title: "Заявки",
        icon: ClipboardList,
        url: "/engineer/dashboard/repair-requests",
    },
    {
        title: "Запчастини",
        icon: Package,
        url: "/engineer/dashboard/spare-parts",
    },
]

type EngineerDashboardLayoutProps = {
    children: React.ReactNode;
}
const EngineerDashboardLayout = ({ children }: EngineerDashboardLayoutProps) => {
    return (
        <DashboardLayout showFullLogo={true} tabs={EngineerDashboardLayoutTabs}>
            { children }
        </DashboardLayout>
    );
};

export { EngineerDashboardLayout };