import type {SparePart} from "@/domain/entities/spare-part.ts";
import {Package} from "lucide-react";
import {Card} from "@/presentation/components/ui/card.tsx";
import SparePartItem from "@/presentation/components/tabs/spare-parts/SparePartItem.tsx";
import type {LocationCreate, SparePartUpdate} from "@/domain/models/spare-part.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {MutationOptions} from "@/presentation/models.ts";

interface Props {
    spareParts: SparePart[];

    updateLocations: (sparePartId: string, locations: LocationCreate[], options?: MutationOptions) => void;
    updateSparePart: (data: SparePartUpdate, options?: MutationOptions) => void;
    deleteSparePart: (id: string, options?: MutationOptions) => void;

    institutions: Institution[];
    suppliers: Supplier[];
    models: EquipmentModel[];
    categories: SparePartCategory[];
}

const SparePartsTable = ({
    spareParts, updateLocations, institutions, suppliers, models, categories, updateSparePart, deleteSparePart
}: Props) => {
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
                        <SparePartItem
                            key={part.id}
                            sparePart={part}
                            deleteSparePart={deleteSparePart}
                            updateSparePart={updateSparePart}
                            updateLocations={updateLocations}
                            institutions={institutions}
                            suppliers={suppliers}
                            models={models}
                            categories={categories}
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

export default SparePartsTable;