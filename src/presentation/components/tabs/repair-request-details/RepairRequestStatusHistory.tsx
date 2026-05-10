import type { RepairRequestStatusRecord } from "@/domain/entities/repair-request";
import RepairRequestStatusCircle from "../../layouts/RepairRequestStatusCircle";
import RepairRequestStatusLabel from "../../layouts/RepairRequestStatusLabel";


interface Props { statusHistory: RepairRequestStatusRecord[] }
const StatusHistory = ({ statusHistory }: Props) => {
    return (
        <div className="bg-white">
            <p className="px-4 py-3 text-md text-slate-900 border-b">Історія статусів</p>
            <div className="flex flex-col overflow-y-auto max-h-90">
                {statusHistory.map((entry, i) => {
                    const last = new Date(entry.createdAt).toLocaleDateString('uk-UA');
                    const now = i === 0 ? "сьогодні" : new Date(statusHistory[i - 1].createdAt).toLocaleDateString('uk-UA');

                    return (
                        <div key={i} className="px-4 py-3 flex border-b hover:bg-slate-50 justify-between items-center last:border-0">
                            <div className="flex gap-3 items-center">
                                <div className="flex items-center gap-2">
                                    <RepairRequestStatusCircle size={'md'} status={entry.status} />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900">
                                            <RepairRequestStatusLabel status={entry.status} />
                                        </span>
                                        <span className="text-xs text-slate-600">{entry.assignedEngineer?.username ?? "Система"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-right text-slate-600 whitespace-nowrap">
                                <p>{last} - {now}</p>
                                {entry.wasMerged && (<p>Доповнено</p>)}
                            </div>
                        </div>
                    );
                })}
             </div>
        </div>
    );
};

export default StatusHistory;