import {Card} from "@/presentation/components/ui/card.tsx";
import type {RepairRequestState, RepairRequestStatus} from "@/domain/entities/repair-request.ts";

function mapStatus(status: RepairRequestStatus): string {
    switch (status) {
        case "finished": return "Завершена";
        case "in_progress": return "У роботі";
        case "not_taken": return "Нова";
        case "waiting_spare_parts": return "Очікує на запчастини";
    }
}

type StatusHistoryProps = { statusHistory: RepairRequestState[] };
const StatusHistory = ({ statusHistory }: StatusHistoryProps) => {
    return (
        <Card className="bg-white border-slate-200">
            <div className="p-6">
                <h3 className="text-slate-900 mb-4">Історія статусів</h3>
                <div className="space-y-4">
                    {statusHistory.map((item, index) => (
                        <div key={index} className="relative pl-6 pb-4 border-l-2 border-slate-200 last:border-transparent last:pb-0">
                            <div className="absolute -left-2.25 top-0 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
                            <div>
                                <p className="text-slate-900">{mapStatus(item.status)}</p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {new Date(item.createdAt).toLocaleDateString('uk-UA')}
                                </p>
                                <p className="text-xs text-slate-600 mt-1">{item.responsibleUser?.username ?? "Система"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>

    );
};

export default StatusHistory;