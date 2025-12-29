import type {Urgency} from "@/domain/entities/repair-request.ts";
import {Badge} from "@/components/ui/badge.tsx";

const getPriorityBadge = (priority: Urgency) => {
    return priority === 'critical' ? (
        <Badge variant="destructive" className="bg-red-500">
            Критичний
        </Badge>
    ) : (
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            Звичайний
        </Badge>
    );
};

export { getPriorityBadge };