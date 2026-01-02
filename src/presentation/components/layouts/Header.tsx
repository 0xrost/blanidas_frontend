import {Button} from "@/presentation/components/ui/button.tsx";
import {LogOut} from "lucide-react";
import * as React from "react";
import type {Role} from "@/domain/auth/roles.ts";

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

type DashboardHeaderProps = {
    username: string,
    role: Role,
    onLogout: () => void,
    children: React.ReactNode | null,
    showFullLogo: boolean
}

const DashboardHeader = ({ username, role, onLogout, children, showFullLogo }: DashboardHeaderProps) => {
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
                    <div className="hidden md:flex gap-2">
                        {children}
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
                <div className="flex md:hidden gap-2 mt-4 border-t border-slate-200 pt-4">
                    {children}
                </div>
            </div>
        </header>
    );
};

export { Header, DashboardHeader  };
export type { DashboardHeaderProps };