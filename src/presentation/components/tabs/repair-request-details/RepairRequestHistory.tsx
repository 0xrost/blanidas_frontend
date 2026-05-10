import { ChevronRight, FileText } from "lucide-react";
import type { RepairRequest } from "@/domain/entities/repair-request.ts";
import RepairRequestStatusCircle from "../../layouts/RepairRequestStatusCircle";
import RepairRequestStatusLabel from "../../layouts/RepairRequestStatusLabel";


type Props = { 
    repairHistory: RepairRequest[]
    goTo: (id: string) => void
 };

const RepairHistory = ({ repairHistory, goTo }: Props) => {
    return (
        <div className="bg-white lg:border-t border-l lg:border-l-0">
            <p className="px-4 py-3 border-b border-slate-200 text-slate-900">Історія поломок обладнання</p>
            {repairHistory.length > 0 ? (
                <>
                    {repairHistory.map((entry) => {
                        const borderStyle = entry.urgency === "critical" ? "border-l-red-400 border-l-2" : "";
                        return (
                            <div
                                key={entry.id}
                                className={`${borderStyle} px-4 py-3 flex justify-between border-b border-slate-200 hover:bg-slate-50 last:border-0`}
                                onClick={() => goTo(entry.id)}
                            >
                                <div className="flex items-center gap-2 text-sm">
                                    <RepairRequestStatusCircle size={'md'} status={entry.lastStatus} />
                                    <div>
                                        <span className="font-medium text-slate-900">
                                            <RepairRequestStatusLabel status={entry.lastStatus} />
                                        </span>
                                        {entry.entries[0]?.issue && (
                                            <p className="text-slate-500 truncate max-w-[180px]">{entry.entries[0].issue}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                    <span className="text-xs text-slate-400">{new Date(entry.createdAt).toLocaleDateString("uk-UA")}</span>
                                </div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <div className="text-center py-6">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Немає заявок на ремонт</p>
                </div>
            )}
        </div>
    );
};

export default RepairHistory;