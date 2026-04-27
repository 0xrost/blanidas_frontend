import type {LucideIcon} from "lucide-react";
import {Card} from "@/presentation/components/ui/card.tsx";

interface ColorScheme {
    card: string,
    label: string,
    value: string
    icon: string
}

type Color = "red" | "blue" | "green" | "orange" | "yellow" | "slate" | "purple" | "cyan" | "pink";
interface Props {
    label: string;
    value: number;
    color: Color;
    icon: LucideIcon;
    onClick?: () => void;
    selected?: boolean;
}

const colorSchemes: Record<Color, ColorScheme> = {
    red: {
        card: "bg-red-50 border-red-200",
        label: "text-red-700",
        value: "text-red-900",
        icon: "text-red-500",
    },
    blue: {
        card: "bg-blue-50 border-blue-200",
        label: "text-blue-700",
        value: "text-blue-900",
        icon: "text-blue-500",
    },
    green: {
        card: "bg-green-50 border-green-200",
        label: "text-green-700",
        value: "text-green-900",
        icon: "text-green-500",
    },
    orange: {
        card: "bg-orange-50 border-orange-200",
        label: "text-orange-700",
        value: "text-orange-900",
        icon: "text-orange-500",
    },
    yellow: {
        card: "bg-yellow-50 border-yellow-200",
        label: "text-yellow-700",
        value: "text-yellow-900",
        icon: "text-yellow-500",
    },
    slate: {
        card: "bg-slate-50 border-slate-200",
        label: "text-slate-700",
        value: "text-slate-900",
        icon: "text-slate-500",
    },
    purple: {
        card: "bg-purple-50 border-purple-200",
        label: "text-purple-700",
        value: "text-purple-900",
        icon: "text-purple-500",
    },
    cyan: {
        card: "bg-cyan-50 border-cyan-200",
        label: "text-cyan-700",
        value: "text-cyan-900",
        icon: "text-cyan-500",
    },
    pink: {
        card: "bg-pink-50 border-pink-200",
        label: "text-pink-700",
        value: "text-pink-900",
        icon: "text-pink-500",
    },
};

const DashboardCard = ({ label, value, icon: Icon, color, onClick, selected }: Props) => {
    const isClickable = typeof onClick === "function";

    return (
        <Card
            className={[
                colorSchemes[color].card,
                isClickable ? "cursor-pointer transition hover:brightness-[0.98] active:brightness-[0.96]" : "",
                selected ? "ring-2 ring-slate-400 ring-offset-2 shadow-sm" : "",
            ].join(" ")}
            onClick={onClick}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            aria-pressed={isClickable ? (selected ?? false) : undefined}
            onKeyDown={(e) => {
                if (!isClickable) return;
                if (e.key === "Enter" || e.key === " ") onClick();
            }}
        >
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-sm ${colorSchemes[color].label}`}>{label}</p>
                        <p className={`text-2xl ${colorSchemes[color].value} mt-1`}>{value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${colorSchemes[color].icon}`} />
                </div>
            </div>
        </Card>
    );
};

export default DashboardCard;