import {DashboardHeader} from "@/presentation/components/layouts/header/Header.tsx";
import {BarChart3, ClipboardList, type LucideIcon, Monitor, Package, Settings} from "lucide-react";
import {DashboardFooter} from "@/presentation/components/layouts/Footer.tsx";
import {useAuthSession, useLogout} from "@/presentation/hooks/auth.ts";
import {useNavigate} from "@tanstack/react-router";

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

    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        void navigate({to: "/accounts/login"})
    }

    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
            <DashboardHeader
                username={session?.currentUser.username ?? ""}
                role={session?.currentUser.role ?? "engineer"}
                tabConfigs={tabs.map(x => ({
                    ...x,
                    to: x.url,
                }))}
                showFullLogo={showFullLogo}
                onLogout={onLogout}
            />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                { children }
            </main>
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

type EngineerDashboardLayoutProps = { children: React.ReactNode; }
const EngineerDashboardLayout = ({ children }: EngineerDashboardLayoutProps) => {
    return (
        <DashboardLayout showFullLogo={true} tabs={EngineerDashboardLayoutTabs}>
            { children }
        </DashboardLayout>
    );
};

const ManagerDashboardLayoutTabs: DashboardLayoutTab[] = [
    {
        title: "Статистика",
        icon: BarChart3,
        url: "/manager/dashboard/statistics",
    },
    {
        title: "Заявки",
        icon: ClipboardList,
        url: "/manager/dashboard/repair-requests",
    },
    {
        title: "Запчастини",
        icon: Package,
        url: "/manager/dashboard/spare-parts",
    },
    {
        title: "Обладнання",
        icon: Monitor,
        url: "/manager/dashboard/equipment",
    },
    {
        title: "Інше",
        icon: Settings,
        url: "/manager/dashboard/settings",
    },
]

type ManagerDashboardLayoutProps = { children: React.ReactNode };
const ManagerDashboardLayout = ({ children }: ManagerDashboardLayoutProps) => {
    return (
        <DashboardLayout showFullLogo={false} tabs={ManagerDashboardLayoutTabs}>
            { children }
        </DashboardLayout>
    );
}

export { EngineerDashboardLayout, ManagerDashboardLayout };