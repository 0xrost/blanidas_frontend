import type {Status} from "@/domain/entities/repair-request.ts";
import {Badge} from "@/presentation/components/ui/badge.tsx";

type Color = "green" | "red" | "orange" | "yellow" | "blue";
const colors: Record<Color, string> = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-green-100 text-green-700 border-green-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    red: "bg-red-100 text-red-700 border-red-200",
}

interface Scheme {
    color: Color;
    title: string;
}


interface Props { color: Color, children: React.ReactNode }
const StatusBadge = ({ color, children }: Props) => {
    return (
        <Badge className={`${colors[color]} rounded-md`}>
            {children}
        </Badge>
    );
};

const repairRequestScheme: Record<Status, Scheme> = {
    "finished": {
        color: "green",
        title: "Виконано",
    },
    "waiting_engineer": {
        color: "blue",
        title: "Очікує інженера",
    },
    "waiting_spare_parts": {
        color: "yellow",
        title: "Очікує запчастини",
    },
    "in_progress": {
        color: "orange",
        title: "У роботі",
    },
    "not_taken": {
        color: "red",
        title: "Новий",
    }
}

interface RepairRequestStatusBadgeProps { status: Status }
const RepairRequestStatusBadge = ({ status }: RepairRequestStatusBadgeProps) => {
    const scheme = repairRequestScheme[status];
    return (
        <StatusBadge color={scheme.color}>
            {scheme.title}
        </StatusBadge>
    )
}

export { StatusBadge, RepairRequestStatusBadge };