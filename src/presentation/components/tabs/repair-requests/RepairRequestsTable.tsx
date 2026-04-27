import {Building2, ChevronRight, ClipboardList, MapPin} from "lucide-react";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import EmptyTable from "@/presentation/components/layouts/EmptyTable.tsx";
import StatusIcon from "../../layouts/StatusIcon";

type RepairRequestsListProps = {
    repairRequests: RepairRequest[];
    onGoToDetails: (id: string) => void;
}
const RepairRequestsTable = ({ repairRequests, onGoToDetails }: RepairRequestsListProps) => {
    return (
        <>
            <div className="md:hidden">
                {repairRequests.length === 0 ? (
                    <EmptyTable title="Заявки не знайдено" icon={ClipboardList} />
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                        {repairRequests.map((rr) => (
                            <button
                                key={rr.id}
                                type="button"
                                onClick={() => onGoToDetails(rr.id)}
                                className={`
                                    ${rr.urgency == "critical" ? "border-l-red-400 border-l-2" : ""}
                                    w-full text-left p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors
                                `}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex items-center">
                                            <StatusIcon 
                                                status={rr.lastStatus}
                                                statusToStyleMap={{
                                                    finished: "green",
                                                    not_taken: "red",
                                                    in_progress: "orange",
                                                    waiting_spare_parts: "yellow",
                                                }}
                                            />
                                            <p className="text-sm font-medium text-slate-900 truncate">
                                                {rr.equipment.model.name}
                                            </p>
                                        </div>
                                        <p className="text-xs text-slate-800 font-medium truncate mt-0.5">
                                            {rr.equipment.serialNumber}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-slate-700 mt-2">
                                            <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                                            <span className="truncate">
                                                {rr.equipment.institution.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-slate-600 mt-2">
                                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                            <span className="truncate">
                                                {rr.equipment.location}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="hidden md:block">
                {repairRequests.length === 0 ? (
                    <EmptyTable title="Заявки не знайдено" icon={ClipboardList} />
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,0.5fr)_auto] lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,0.4fr)_auto] gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 uppercase tracking-wider">
                            <div>Обладнання</div>
                            <div>Локація / Центр</div>
                            <div className="hidden lg:block">Категорія</div>
                            <div>Дата</div>
                            <div className="text-right" />
                        </div>

                        <div className="divide-y divide-slate-100">
                            {repairRequests.map((rr) => (
                                <button
                                    key={rr.id}
                                    type="button"
                                    onClick={() => onGoToDetails(rr.id)}
                                    className={`
                                        ${rr.urgency == "critical" ? "border-l-red-400 border-l-2" : ""}
                                        w-full text-left grid 
                                        grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,0.5fr)_auto] 
                                        lg:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,0.5fr)_auto] 
                                        gap-4 px-4 py-3 items-center hover:bg-slate-50 transition-colors
                                    `}
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-center min-w-0">
                                            <StatusIcon 
                                                status={rr.lastStatus}
                                                statusToStyleMap={{
                                                    finished: "green",
                                                    not_taken: "red",
                                                    in_progress: "orange",
                                                    waiting_spare_parts: "yellow",
                                                }}
                                            />
                                            <p className="text-sm font-medium text-slate-900 truncate" title={rr.equipment.model.name}>
                                                {rr.equipment.model.name}
                                            </p>
                                        </div>
                                        <p className="text-xs font-medium text-slate-900 truncate mt-0.5" title={rr.equipment.serialNumber}>
                                            {rr.equipment.serialNumber}
                                        </p>
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <Building2 className="w-4 h-4 text-slate-300 shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate" title={rr.equipment.institution.name}>
                                                    {rr.equipment.institution.name}
                                                </p>
                                                <div className="flex items-center gap-1 text-xs text-slate-600 min-w-0">
                                                    <span className="truncate" title={rr.equipment.location}>
                                                        {rr.equipment.location}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="min-w-0 hidden lg:block">
                                        <span className="text-sm text-purple-700 text-wrap block" title={rr.equipment.category?.name ?? ""}>
                                            {rr.equipment.category?.name ?? "—"}
                                        </span>
                                    </div>

                                    <div className="min-w-0">
                                        <span className="text-sm text-slate-700 whitespace-nowrap">
                                            {new Date(rr.createdAt).toLocaleDateString("uk-UA")}
                                        </span>
                                    </div>

                                    <div className="flex justify-end">
                                        <ChevronRight className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RepairRequestsTable;