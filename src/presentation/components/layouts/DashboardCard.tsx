import type {LucideIcon} from "lucide-react";
import {Card} from "@/presentation/components/ui/card.tsx";

type DashboardCardColor = "red" | "blue" | "green" | "orange" | "yellow";
const colorStyles: Record<DashboardCardColor, {
    card: string;
    label: string;
    value: string;
    icon: string;
}> = {
    yellow: {
        card: "bg-yellow-50 border-yellow-200",
        label: "text-yellow-700",
        value: "text-yellow-900",
        icon: "text-yellow-500",
    },
    orange: {
        card: "bg-orange-50 border-orange-200",
        label: "text-orange-700",
        value: "text-orange-900",
        icon: "text-orange-500",
    },
    green: {
        card: "bg-green-50 border-green-200",
        label: "text-green-700",
        value: "text-green-900",
        icon: "text-green-500",
    },
    blue: {
        card: "bg-blue-50 border-blue-200",
        label: "text-blue-700",
        value: "text-blue-900",
        icon: "text-blue-500",
    },
    red: {
        card: "bg-red-50 border-red-200",
        label: "text-red-700",
        value: "text-red-900",
        icon: "text-red-500",
    },
};

type DashboardCardProps = {
    label: string;
    value: number;
    color: DashboardCardColor;
    icon: LucideIcon;
}
const DashboardCard = ({ label, value, icon: Icon, color }: DashboardCardProps) => {
    return (
        <Card className={`py-0 ${colorStyles[color].card}`}>
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-sm ${colorStyles[color].label}`}>{label}</p>
                        <p className={`text-2xl ${colorStyles[color].value} mt-1`}>{value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${colorStyles[color].icon}`} />
                </div>
            </div>
        </Card>
    );
};

export default DashboardCard;