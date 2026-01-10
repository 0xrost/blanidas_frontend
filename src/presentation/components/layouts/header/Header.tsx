import {Button} from "@/presentation/components/ui/button.tsx";
import {LogOut, type LucideIcon} from "lucide-react";
import type {Role} from "@/domain/auth/roles.ts";
import NavigationTab from "@/presentation/components/layouts/header/NavigationTab.tsx";
import {useEffect, useMemo, useRef} from "react";
import {useLocation} from "@tanstack/react-router";

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl">B</span>
                        </div>
                        <div>
                            <h1 className="text-slate-900">Blanidas</h1>
                            <p className="text-slate-600 text-sm">Заявка на ремонт</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

interface TabConfig {
    to: string
    title: string;
    icon: LucideIcon;
}

interface Props {
    username: string;
    role: Role;
    onLogout: () => void;
    showFullLogo: boolean;
    tabConfigs: TabConfig[];
}

const DashboardHeader = ({ username, role, tabConfigs, onLogout, showFullLogo }: Props) => {
    const location = useLocation();

    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, []);

    const tabs = useMemo(() => {
        return tabConfigs.map(tab => {
            const isActive = location.pathname == tab.to
            return (
                <span ref={isActive ? targetRef : null}>
                    <NavigationTab key={tab.to} to={tab.to} icon={tab.icon} isActive={isActive} title={tab.title}/>
                </span>
            );
        });
    }, [tabConfigs, location]);

    return (
        <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <span className="text-white text-xl">B</span>
                            </div>
                            {showFullLogo &&
                                <div>
                                    <h1 className="text-slate-900">Blanidas Service System</h1>
                                    <p className="text-slate-600 text-sm">Панель інженера</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="hidden overflow-x-auto md:flex gap-2">
                        {tabs}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <p className="text-slate-900">{username}</p>
                            <p className="text-xs text-slate-500">
                                {role == "manager" ? "менеджер" : "інженер"}
                            </p>
                        </div>
                        <Button onClick={onLogout} variant="ghost" size="sm" className="text-slate-600">
                            <LogOut className="w-4 h-4 mr-2" />
                        </Button>
                    </div>
                </div>
                <div className={`flex flex-row ${tabs.length < 3 ? "justify-center" : ""} overflow-x-auto md:hidden gap-2 mt-4 border-t border-slate-200 pt-4`}>
                    {tabs}
                </div>
            </div>
        </header>
    );
};

export { Header, DashboardHeader  };
export type { Props };