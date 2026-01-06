import {Building2, Calendar, ChevronRight, MapPin, Monitor} from "lucide-react";
import {Badge} from "@/presentation/components/ui/badge.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import Table, {type Column} from "@/presentation/components/layouts/Table.tsx";
import {useMemo} from "react";
import {PriorityBadge} from "@/presentation/components/tabs/repair-requests/PriorityBadge.tsx";
import {RepairRequestStatusBadge} from "@/presentation/components/layouts/StatusBadge.tsx";

type RepairRequestsListProps = {
    repairRequests: RepairRequest[];
    onGoToDetails: (id: string) => void;
}
const RepairRequestsTable = ({ repairRequests, onGoToDetails }: RepairRequestsListProps) => {
    const columns: Column<RepairRequest>[] = useMemo(() => [
        {
            key: "equipment",
            header: "Обладнання",
            className: "px-3 py-4",
            cell: repairRequest => (
                <div className="flex items-start gap-2">
                    <Monitor className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    <div className="min-w-0">
                        <p
                            title={repairRequest.equipment?.model?.name}
                            className="text-sm text-slate-900 truncate max-w-80"
                        >
                            {repairRequest.equipment?.model?.name}
                        </p>
                        <p
                            title={repairRequest.equipment?.serialNumber}
                            className="text-xs text-slate-500 truncate"
                        >
                            {repairRequest.equipment?.serialNumber}
                        </p>
                    </div>
                </div>
            )
        },
        {
            key: "location",
            header: "Локація / Центр",
            className: "px-3 py-4",
            cell: repairRequest => (
                <div>
                    <div className="flex items-center gap-1 text-sm text-slate-900 mb-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span
                            title={repairRequest.equipment?.institution?.name}
                            className="truncate max-w-80"
                        >
                        {repairRequest.equipment?.institution?.name}
                    </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span
                            title={repairRequest.equipment?.location}
                            className="truncate max-w-80"
                        >
                        {repairRequest.equipment?.location}
                    </span>
                    </div>
                </div>
            )
        },
        {
            key: "category",
            header: "Категорія",
            className: "px-3 py-4 whitespace-nowrap",
            cell: repairRequest => (
                <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200"
                >
                    {repairRequest.equipment?.category?.name}
                </Badge>
            )
        },
        {
            key: "status",
            header: "Статус",
            className: "px-3 py-4 whitespace-nowrap",
            cell: repairRequest =>
                <RepairRequestStatusBadge status={repairRequest.lastStatus}/>
        },
        {
            key: "priority",
            header: "Пріоритет",
            className: "px-3 py-4 whitespace-nowrap",
            cell: repairRequest => <PriorityBadge priority={repairRequest.urgency} />
        },
        {
            key: "createdAt",
            header: "Дата",
            className: "px-3 py-4 whitespace-nowrap",
            cell: repairRequest => (
                <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {new Date(repairRequest.createdAt).toLocaleDateString("uk-UA")}
                </div>
            )
        },
        {
            key: "actions",
            header: "Дії",
            className: "px-3 py-4 text-right whitespace-nowrap",
            cell: repairRequest => (
                <Button
                    size="sm"
                    title={repairRequest.issue}
                    onClick={() => onGoToDetails(repairRequest.id)}
                    className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            )
        }
    ], [onGoToDetails]);


    return (
        <Table
            data={repairRequests}
            columns={columns}
            rowKey={m => m.id}
        />
    );
};

export default RepairRequestsTable;