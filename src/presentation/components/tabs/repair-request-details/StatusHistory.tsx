import {Card} from "@/presentation/components/ui/card.tsx";
import type {RepairRequestStatusRecord, Status} from "@/domain/entities/repair-request.ts";

function mapStatus(status: Status): string {
    switch (status) {
        case "finished": return "Завершена";
        case "in_progress": return "У роботі";
        case "not_taken": return "Нова";
        case "waiting_spare_parts": return "Очікує запчастини";
    }
}

type StatusHistoryProps = { statusHistory: RepairRequestStatusRecord[] };
const StatusHistory = ({ statusHistory }: StatusHistoryProps) => {
    const formatter = new Intl.DateTimeFormat('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return (
        <Card className="bg-white border-slate-200">
            <div className="p-6">
                <h3 className="text-slate-900 mb-4">Історія статусів</h3>
                <div className="space-y-4">
                    {statusHistory.reverse().map((item, index) => (
                        <div key={index} className="relative pl-6 pb-4 border-l-2 border-slate-200 last:border-transparent last:pb-0">
                            <div className="absolute -left-2.25 top-0 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
                            <div>
                                <p className="text-slate-900">{mapStatus(item.status)}</p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {formatter.format(new Date(item.createdAt))}
                                </p>
                                <p className="text-xs text-slate-600 mt-1">{item.assignedEngineer?.username ?? "Система"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>

    );
};

export default StatusHistory;