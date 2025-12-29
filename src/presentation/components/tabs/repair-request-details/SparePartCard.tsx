import {Card} from "@/presentation/components/ui/card.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {MapPin, Package, Plus, Trash2} from "lucide-react";
import type {RepairRequestUsedSparePartVM} from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";

type SparePartCardProps = {
    usedSpareParts: RepairRequestUsedSparePartVM[],
    isReadonly: boolean,
    onOpenModal: () => void,
    onDeleteSparePart: (sparePart: RepairRequestUsedSparePartVM) => void,
}
const SparePartCard = ({ usedSpareParts, onDeleteSparePart, onOpenModal, isReadonly }: SparePartCardProps) => {
    return (
        <Card className="py-0 bg-white border-slate-200">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900">Використані запчастини</h3>
                    {!isReadonly &&
                        <Button
                            onClick={onOpenModal}
                            className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                        >
                            <Plus className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:block">Додати запчастину</span>
                        </Button>
                    }
                </div>

                {usedSpareParts && usedSpareParts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-4 text-sm text-slate-600">Назва</th>
                                <th className="text-left py-3 px-4 text-sm text-slate-600">Склад</th>
                                <th className="text-left py-3 px-4 text-sm text-slate-600">Кількість</th>
                                <th className="text-left py-3 px-4 text-sm text-slate-600">Примітка</th>
                                {!isReadonly && <th className="text-left py-3 px-4 text-sm text-slate-600"></th>}
                            </tr>
                            </thead>
                            <tbody>
                            {usedSpareParts.map((part) => (
                                <tr key={`${part.quantity}${part.sparePart?.id}${part.institution?.id}`} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="text-nowrap py-3 px-4 text-slate-900">
                                        <p className="truncate max-w-25" title={part.sparePart?.name}>
                                            {part.sparePart?.name}
                                        </p>
                                    </td>
                                    <td className="py-3 px-4 text-slate-600">
                                        <div className="flex items-center gap-1 text-nowrap text-sm text-slate-700">
                                            <MapPin className="w-3 h-3 text-slate-400" />
                                            <p className="truncate max-w-25" title={part.institution?.name}>{part.institution?.name}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-slate-900">{part.quantity}</td>
                                    <td className="text-nowrap break-all py-3 px-4 text-slate-600 text-sm">
                                        <p className="truncate max-w-25" title={part.note}>
                                            {part.note}
                                        </p>
                                    </td>
                                    {!isReadonly &&
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => onDeleteSparePart(part)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    }
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-lg">
                        <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                        <p className="text-slate-500">Запчастини {!isReadonly && "ще"} не додано</p>
                    </div>
                )}
            </div>
        </Card>

    );
};

export default SparePartCard;