import {Building2, Calendar, ChevronRight, MapPin, Monitor} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {getStatusBadge} from "@/presentation/components/tabs/repair-requests-list/StatusBadge.tsx";
import {getPriorityBadge} from "@/presentation/components/tabs/repair-requests-list/PriorityBadge.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Card} from "@/presentation/components/ui/card.tsx";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";

type RepairRequestsListProps = {
    repairRequests: RepairRequest[];
    onOpenItemDetails: (repairRequest: RepairRequest) => void;
}
const RepairRequestsList = ({ repairRequests, onOpenItemDetails }: RepairRequestsListProps) => {
    console.log(repairRequests);
    return (
        <Card className="py-0 bg-white border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                            Обладнання
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                            Локація / Центр
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider hidden xl:table-cell">
                            Категорія
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                            Статус
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                            Пріоритет
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                            Дата
                        </th>
                        <th className="px-4 py-3 text-right text-xs text-slate-600 uppercase tracking-wider">
                            Дії
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {repairRequests && repairRequests.map((repairRequest) => (
                        <tr
                            key={repairRequest.id}
                            className={`hover:bg-slate-50 transition-colors ${
                                repairRequest.urgency === 'critical' ? 'bg-red-50/30' : ''
                            }`}
                        >
                            <td className="px-3 py-4">
                                <div className="flex items-start gap-2">
                                    <Monitor className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                                    <div className="min-w-0">
                                        <p
                                            title={repairRequest?.equipment?.equipmentModel?.name}
                                            className="text-sm text-slate-900 truncate max-w-80"
                                        >{repairRequest?.equipment?.equipmentModel?.name}</p>
                                        <p
                                            title={repairRequest.equipment?.serialNumber}
                                            className="text-xs text-slate-500 truncate"
                                        >{repairRequest.equipment?.serialNumber}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-3 py-4">
                                <div>
                                    <div className="flex items-center gap-1 text-sm text-slate-900 mb-1">
                                        <Building2 className="w-3 h-3 text-slate-400" />
                                        <span
                                            title={repairRequest.equipment?.institution?.name}
                                            className="truncate max-w-80">{repairRequest.equipment?.institution?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <MapPin className="w-3 h-3 text-slate-400" />
                                        <span
                                            title={repairRequest.equipment?.location}
                                            className="truncate max-w-80"
                                        >{repairRequest.equipment?.location}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap content-center">
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                    {repairRequest.equipment?.equipmentCategory?.name}
                                </Badge>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap content-center">
                                {getStatusBadge(repairRequest.statusHistory[0].status)}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap content-center">
                                {getPriorityBadge(repairRequest.urgency)}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-1 text-sm text-slate-600">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    {new Date(repairRequest.createdAt).toLocaleDateString('uk-UA')}
                                </div>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-right">
                                <Button
                                    size="sm"
                                    title={repairRequest.issue}
                                    onClick={() => onOpenItemDetails(repairRequest)}
                                    className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {(!repairRequests) || repairRequests.length === 0 && (
                    <div className="p-12 text-center">
                        <Monitor className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">Немає пристроїв, що відповідають фільтрам</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default RepairRequestsList;