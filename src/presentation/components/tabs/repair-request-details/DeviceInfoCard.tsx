import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import {ArrowLeft, Building2, CalendarCheck, CalendarPlus, MapPin} from "lucide-react";
import {RepairRequestStatusBadge} from "@/presentation/components/layouts/StatusBadge.tsx";

interface Props { 
    repairRequest: RepairRequest;
    goToDashboard: () => void;
 }
const DeviceInfoCard = ({ repairRequest, goToDashboard }: Props) => {
    return (
        <div className="bg-white border-slate-200">
            <div className="p-4">
                <div className="flex flex-col md:flex-row  items-start justify-between mb-4">
                    <div className="md:hidden flex w-full justify-between items-center">
                        <button
                            onClick={goToDashboard}
                            className="p-1.5 rounded-lg text-slate-400 h-min hover:text-slate-700 hover:bg-slate-50 transition-colors"
                            aria-label="Назад"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <RepairRequestStatusBadge status={repairRequest.lastStatus} />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={goToDashboard}
                            className="p-1.5 hidden md:block rounded-lg text-slate-400 h-min hover:text-slate-700 hover:bg-slate-50 transition-colors"
                            aria-label="Назад"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div>
                            <p className="text-md text-slate-900">{repairRequest.equipment?.model?.name}</p>
                            <p className="text-sm text-slate-600">{repairRequest.equipment?.serialNumber}</p>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <RepairRequestStatusBadge status={repairRequest.lastStatus} />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <Building2 className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-500">Центр</p>
                                <p className="text-sm text-slate-900">{repairRequest.equipment?.institution?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-500">Розташування</p>
                                <p className="text-sm text-slate-900">{repairRequest.equipment?.location}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CalendarPlus className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-500">Дата створення</p>
                                <p className="text-sm text-slate-900">
                                    {new Date(repairRequest.createdAt).toLocaleDateString('uk-UA')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CalendarCheck className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-500">Дата оновлення</p>
                                <p className="text-sm text-slate-900">
                                    {repairRequest.updatedAt ? new Date(repairRequest.updatedAt).toLocaleDateString('uk-UA') : "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DeviceInfoCard;