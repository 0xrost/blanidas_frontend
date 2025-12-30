import type {SparePart} from "@/domain/entities/spare-part.ts";
import {Package} from "lucide-react";
import {Card} from "@/presentation/components/ui/card.tsx";
import SparePartsListItem from "@/presentation/components/tabs/spare-parts/SparePartsListItem.tsx";
import type {LocationCreate} from "@/domain/models/spare-parts.ts";

interface Props {
    spareParts: SparePart[];
    updateLocations: (sparePartId: string, locations: LocationCreate[]) => void;
}

const SparePartsList = ({ spareParts, updateLocations }: Props) => {
    return (
        <Card className="bg-white border-slate-200 overflow-x-auto">
            <div className="overflow-x-auto">
                <table className="min-w-max w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">
                            Код / Назва
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">
                            Категорія
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">
                            Локація
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">
                            Постачальник
                        </th>
                        <th className="px-4 py-3 text-center text-xs text-slate-600 uppercase">
                            Кількість
                        </th>
                        <th className="px-4 py-3 text-center text-xs text-slate-600 uppercase">
                            Статус
                        </th>
                        <th className="px-4 py-3 text-right text-xs text-slate-600 uppercase">
                            Дії
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {spareParts.map((part) =>
                        <SparePartsListItem
                            key={part.id}
                            sparePart={part}
                            updateLocations={updateLocations}
                        />
                    )}
                    </tbody>
                </table>

                {spareParts.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600">Запчастини не знайдено</p>
                    </div>
                )}
            </div>
        </Card>

    );
};

export default SparePartsList;