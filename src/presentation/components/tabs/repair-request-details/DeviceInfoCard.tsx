import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import {Card} from "@/presentation/components/ui/card.tsx";
import {getStatusBadge} from "@/presentation/components/tabs/repair-requests-list/StatusBadge.tsx";
import {Building2, Calendar, Hash, MapPin, Monitor} from "lucide-react";
import {formatNumber} from "@/utils.ts";

type DeviceInfoCardProps = {
    repairRequest: RepairRequest
}
const DeviceInfoCard = ({ repairRequest }: DeviceInfoCardProps) => {
    return (
        <Card className="py-0 bg-white border-slate-200">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-slate-900">Інформація про пристрій</h3>
                        <p className="text-sm text-slate-600">ID заявки: {formatNumber(repairRequest.id, 8)}</p>
                    </div>
                    {getStatusBadge(repairRequest.statusHistory[0].status)}

                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <Monitor className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-500">Модель</p>
                                <p className="text-slate-900">{repairRequest.equipment?.equipmentModel?.name}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Hash className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-500">Серійний номер</p>
                                <p className="text-slate-900">{repairRequest.equipment?.serialNumber}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Building2 className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-500">Центр</p>
                                <p className="text-slate-900">{repairRequest.equipment?.institution?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-500">Дата заявки</p>
                                <p className="text-slate-900">
                                    {new Date(repairRequest.createdAt).toLocaleDateString('uk-UA')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-500">Розташування</p>
                                <p className="text-slate-900">{repairRequest.equipment?.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
};

export default DeviceInfoCard;