import {Link} from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

type NavigationTabProps = {
    to: string
    title: string;
    icon: LucideIcon;
    isActive: boolean;
}

const NavigationTab = ({ to, title, icon: Icon, isActive }: NavigationTabProps) => {
    return (
        <Link
            to={to}
            className={`flex flex-1 justify-center items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
            <Icon className="w-4 h-4" />
            <span>{title}</span>
        </Link>
    );
};

export default NavigationTab;