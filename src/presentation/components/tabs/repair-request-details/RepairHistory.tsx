import {Card} from "@/presentation/components/ui/card.tsx";
import {Calendar, CheckCircle2, Clock, FileText, User} from "lucide-react";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import {formatDuration} from "@/presentation/utils.ts";

type RepairHistoryProps = { repairHistory: RepairRequest[] }
const RepairHistory = ({ repairHistory }: RepairHistoryProps) => {
    return (
        <Card className="h-min bg-white border-slate-200">
            <div className="p-6">
                <h3 className="text-slate-900 mb-4">Історія поломок обладнання</h3>
                {repairHistory.length > 0 ? (
                    <div className="space-y-4">
                        {repairHistory.map((repair) => (
                            <div
                                key={repair.id}
                                className="pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <p
                                            className="text-sm text-slate-900 truncate max-w-65"
                                            title={repair.issue}
                                        >{repair.issue}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar className="w-3 h-3 text-slate-400" />
                                            <p className="text-xs text-slate-500">
                                                {new Date(repair.createdAt).toLocaleDateString('uk-UA', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    {repair.statusHistory[0].status === 'finished' && (
                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                    )}
                                </div>
                                {repair.statusHistory[0].assignedEngineer?.username &&
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <User className="w-3 h-3 text-slate-400" />
                                        <span>{repair.statusHistory[0].assignedEngineer?.username}</span>
                                    </div>
                                }
                                {repair.statusHistory[0].status === 'finished' && repair.completedAt && (
                                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                                        <Clock className="w-3 h-3 text-slate-400" />
                                        <span>{formatDuration(repair.createdAt, repair.completedAt)}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">Немає заявок на ремонт</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default RepairHistory;