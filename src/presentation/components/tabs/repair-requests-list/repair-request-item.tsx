import {Card} from "@/presentation/components/ui/card.tsx";
import {Calendar, ChevronRight, Hash, MapPin, Monitor, User} from "lucide-react";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import {getStatusBadge} from "@/presentation/components/tabs/repair-requests-list/status-badge.tsx";
import {getPriorityBadge} from "@/presentation/components/tabs/repair-requests-list/priority-badge.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {limitTextLength} from "@/presentation/pages/utils.ts";

type RepairRequestItemProps = {
    repairRequest: RepairRequest;
    onClick: (repairRequest: RepairRequest) => void;
}
const RepairRequestItem = ({ repairRequest, onClick }: RepairRequestItemProps) => {

    console.log("repairRequest", repairRequest);
    const lastState = repairRequest.stateHistory[repairRequest.stateHistory.length - 1];

    return (
        <Card
            key={repairRequest.id}
            className={`py-0 border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all duration-200 ${
                repairRequest.urgencyLevel === 'critical' ? 'border-l-4 border-l-red-500' : ''
            }`}
        >
            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row items-start">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <Monitor className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    <h3 className="text-slate-900">{repairRequest.equipment?.equipmentModel?.name}</h3>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                                    <div className="flex items-center gap-1">
                                        <Hash className="w-4 h-4 text-slate-400" />
                                        {repairRequest.equipment?.serialNumber}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {repairRequest.equipment?.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        {new Date(repairRequest.createdAt).toLocaleDateString('uk-UA')}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex flex-row items-start gap-1">
                                    {getStatusBadge(lastState.status)}
                                    {getPriorityBadge(repairRequest.urgencyLevel)}
                                </div>
                                <Button
                                    onClick={() => onClick(repairRequest)}
                                    className="ml-3 invisible md:visible bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                                >
                                    Детальніше
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-sm text-slate-600 mb-1">
                                Центр: <span className="text-slate-900">{repairRequest.equipment?.institution?.name}</span>
                            </p>
                            <p className="text-sm text-slate-600 mb-1">
                                Категорія:
                                <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 border-purple-200">{
                                    repairRequest.equipment?.equipmentCategory?.name}
                                </Badge>
                            </p>
                            <p className="text-sm text-slate-600">
                                Проблема: <span className="text-slate-900">{limitTextLength(repairRequest.description, 100)}</span>
                            </p>
                            {lastState.responsibleUser && (
                                <p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    Призначено: <span className="text-slate-900">{lastState.responsibleUser.username}</span>
                                </p>
                            )}
                        </div>
                        <Button
                            onClick={() => onClick(repairRequest)}
                            className="mt-2 md:hidden w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                        >
                            Детальніше
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export { RepairRequestItem };
