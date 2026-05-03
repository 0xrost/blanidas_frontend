import {Card} from "@/presentation/components/ui/card.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import type {Status} from "@/domain/entities/repair-request.ts";

type StatusBarCardProps = {
    status: Status,
    onStatusChange: (status: Status) => void,
}
const StatusBarCard = ({ status, onStatusChange }: StatusBarCardProps) => {
    return (
        <Card className="py-0 bg-white border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center p-6">
                <h3 className="text-nowrap text-slate-900 mb-4 sm:mb-0 sm:mr-4">Статус ремонту</h3>
                <div className="w-full sm:flex-row gap-4">
                    <div className="flex-1">
                        <Select
                            value={status}
                            onValueChange={(value: Status) => onStatusChange(value)}
                        >
                            <SelectTrigger className="w-full bg-slate-100 h-12">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="not_taken">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        Новий
                                    </div>
                                </SelectItem>
                                <SelectItem value="waiting_engineer">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        Очікує інженера
                                    </div>
                                </SelectItem>
                                <SelectItem value="in_progress">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        У роботі
                                    </div>
                                </SelectItem>
                                <SelectItem value="waiting_spare_parts">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        Очікує запчастини
                                    </div>
                                </SelectItem>
                                <SelectItem value="finished">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        Виконано
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default StatusBarCard;