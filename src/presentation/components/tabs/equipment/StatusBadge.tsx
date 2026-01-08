import type {Status} from "@/domain/entities/equipment.ts";
import {CheckCircle, type LucideIcon, Wrench, XCircle} from "lucide-react";
import {Badge} from "@/presentation/components/ui/badge.tsx";

interface Scheme {
    styles: string;
    title: string;
    icon: LucideIcon;
}

const schemes: Record<Status, Scheme> = {
    working: {
        styles: "bg-green-100 text-green-700 border-green-200",
        title: "Робоче",
        icon: CheckCircle
    },
    not_working: {
        styles: "bg-red-100 text-red-700 border-red-200",
        title: "Не працює",
        icon: XCircle,
    },
    under_maintenance: {
        styles: "bg-yellow-100 text-yellow-700 border-yellow-200",
        title: "На обслуговуванні",
        icon: Wrench,
    }
};

interface Props { status: Status }
const StatusBadge = ({ status }: Props) => {
    const Icon = schemes[status].icon;

    return (
        <Badge className={schemes[status].styles}>
            <Icon className="w-3 h-3 mr-1" />
            {schemes[status].title}
        </Badge>
    )
};

export default StatusBadge;