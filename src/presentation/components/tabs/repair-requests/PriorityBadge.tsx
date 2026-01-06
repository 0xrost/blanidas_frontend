import type {Urgency} from "@/domain/entities/repair-request.ts";
import {Badge} from "@/presentation/components/ui/badge.tsx";

interface Scheme {
    title: string;
    styles: string
}

const schemes: Record<Urgency, Scheme> = {
    "critical": {
        title: "Критичний",
        styles: "bg-red-500 text-white",
    },
    "non_critical": {
        title: "Звичайний",
        styles: "bg-blue-100 text-blue-700"
    }
}

interface Props { priority: Urgency }
const PriorityBadge = ({ priority }: Props) => {
    return (
        <Badge variant="secondary" className={schemes[priority].styles}>
            {schemes[priority].title}
        </Badge>
    );
};

export { PriorityBadge };