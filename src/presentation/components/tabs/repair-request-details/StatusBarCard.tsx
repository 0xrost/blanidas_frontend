import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import type {Status} from "@/domain/entities/repair-request.ts";
import RepairRequestStatusCircle from "../../layouts/RepairRequestStatusCircle";
import RepairRequestStatusLabel from "../../layouts/RepairRequestStatusLabel";

type StatusBarCardProps = {
    status: Status,
    onStatusChange: (status: Status) => void,
}
const StatusBarCard = ({ status, onStatusChange }: StatusBarCardProps) => {
    return (
        <div className="bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center px-4 py-3">
                <h3 className="text-nowrap text-slate-900 mb-2 sm:mb-0 sm:mr-4">Статус ремонту</h3>
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
                                        <RepairRequestStatusCircle size="md" status="not_taken" />
                                        <RepairRequestStatusLabel status="not_taken" />
                                    </div>
                                </SelectItem>
                                <SelectItem value="waiting_engineer">
                                    <div className="flex items-center gap-2">
                                        <RepairRequestStatusCircle size="md" status="waiting_engineer" />
                                        <RepairRequestStatusLabel status="waiting_engineer" />
                                    </div>
                                </SelectItem>
                                <SelectItem value="in_progress">
                                    <div className="flex items-center gap-2">
                                        <RepairRequestStatusCircle size="md" status="in_progress" />
                                        <RepairRequestStatusLabel status="in_progress" />
                                    </div>
                                </SelectItem>
                                <SelectItem value="waiting_spare_parts">
                                    <div className="flex items-center gap-2">
                                        <RepairRequestStatusCircle size="md" status="waiting_spare_parts" />
                                        <RepairRequestStatusLabel status="waiting_spare_parts" />
                                    </div>
                                </SelectItem>
                                <SelectItem value="finished">
                                    <div className="flex items-center gap-2">
                                        <RepairRequestStatusCircle size="md" status="finished" />
                                        <RepairRequestStatusLabel status="finished" />
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusBarCard;