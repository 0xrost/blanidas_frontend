import {AlertCircle, CheckCircle2, Clock, type LucideIcon, Package} from "lucide-react";
import type {Status} from "@/domain/entities/repair-request.ts";
import {Badge} from "@/presentation/components/ui/badge.tsx";

type Color = "green" | "red" | "orange" | "yellow";
const colors: Record<Color, string> = {
    green: "bg-green-100 text-green-700 border-green-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    red: "bg-red-100 text-red-700 border-red-200",
}

interface Scheme {
    color: Color;
    icon: LucideIcon;
    title: string;
}


interface Props { color: Color, children: React.ReactNode }
const StatusBadge = ({ color, children }: Props) => {
    return (
        <Badge className={colors[color]}>
            {children}
        </Badge>
    );
};

const repairRequestScheme: Record<Status, Scheme> = {
    "finished": {
        color: "green",
        title: "Виконано",
        icon: CheckCircle2,
    },
    "waiting_spare_parts": {
        color: "yellow",
        title: "Очікує запчастини",
        icon: Package,
    },
    "in_progress": {
        color: "orange",
        title: "У роботі",
        icon: Clock,
    },
    "not_taken": {
        color: "red",
        title: "Новий",
        icon: AlertCircle,
    }
}

interface RepairRequestStatusBadgeProps { status: Status }
const RepairRequestStatusBadge = ({ status }: RepairRequestStatusBadgeProps) => {
    const scheme = repairRequestScheme[status];
    const Icon = scheme.icon;
    return (
        <StatusBadge color={scheme.color}>
            <Icon className="w-3 h-3 mr-1" />
            {scheme.title}
        </StatusBadge>
    )
}

export { StatusBadge, RepairRequestStatusBadge };