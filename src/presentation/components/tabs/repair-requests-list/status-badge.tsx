import {AlertCircle, CheckCircle2, Clock, Package} from "lucide-react";
import type {RepairRequestStatus} from "@/domain/entities/repair-request.ts";
import {Badge} from "@/components/ui/badge.tsx";

const getStatusBadge = (status: RepairRequestStatus) => {
    switch (status) {
        case 'not_taken':
            return (
                <Badge className="bg-red-100 text-red-700 border-red-200">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Новий
                </Badge>
            );
        case 'in_progress':
            return (
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                    <Clock className="w-3 h-3 mr-1" />
                    У роботі
                </Badge>
            );
        case 'waiting_spare_parts':
            return (
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                    <Package className="w-3 h-3 mr-1" />
                    Очікує запчастини
                </Badge>
            );
        case 'finished':
            return (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Виконано
                </Badge>
            );
    }
};

export { getStatusBadge };