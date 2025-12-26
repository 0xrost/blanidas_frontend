import {Card} from "@/presentation/components/ui/card.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Package, Plus, Trash2} from "lucide-react";

const SparePartCard = () => {
    return (
        <Card className="py-0 bg-white border-slate-200">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900">Використані запчастини</h3>
                    <Button
                        onClick={() => setShowAddPartModal(true)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Додати запчастину
                    </Button>
                </div>

                {spareParts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-4 text-sm text-slate-600">Назва</th>
                                <th className="text-left py-3 px-4 text-sm text-slate-600">Код</th>
                                <th className="text-left py-3 px-4 text-sm text-slate-600">Кількість</th>
                                <th className="text-left py-3 px-4 text-sm text-slate-600">Примітка</th>
                                <th className="text-left py-3 px-4 text-sm text-slate-600"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {spareParts.map((part) => (
                                <tr key={part.id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-3 px-4 text-slate-900">{part.name}</td>
                                    <td className="py-3 px-4 text-slate-600">{part.code}</td>
                                    <td className="py-3 px-4 text-slate-900">{part.quantity}</td>
                                    <td className="py-3 px-4 text-slate-600 text-sm">{part.note || '—'}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handleDeletePart(part.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-lg">
                        <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                        <p className="text-slate-500">Запчастини ще не додано</p>
                    </div>
                )}
            </div>
        </Card>

    );
};

export default SparePartCard;