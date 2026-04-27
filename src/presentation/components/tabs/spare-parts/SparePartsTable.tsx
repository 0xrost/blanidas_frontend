import type {SparePart} from "@/domain/entities/spare-part.ts";
import {Package} from "lucide-react";
import SparePartItem from "@/presentation/components/tabs/spare-parts/SparePartItem.tsx";
import type {LocationCreate, SparePartUpdate} from "@/domain/models/spare-part.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import SparePartMobileItem from "@/presentation/components/tabs/spare-parts/SparePartMobileItem.tsx";

interface Props {
    spareParts: SparePart[];

    updateLocations: (sparePartId: string, locations: LocationCreate[], options?: MutationOptions) => void;
    updateSparePart: (data: SparePartUpdate, options?: MutationOptions) => void;
    deleteSparePart: (id: string, options?: MutationOptions) => void;

    institutions: Institution[];
    models: EquipmentModel[];
    categories: SparePartCategory[];
}

const SparePartsTable = ({
    spareParts, updateLocations, institutions, models, categories, updateSparePart, deleteSparePart
}: Props) => {
    return (
        <>
            <div className="md:hidden bg-white border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                {spareParts.map((part) => (
                    <SparePartMobileItem
                        key={part.id}
                        sparePart={part}
                        models={models}
                        categories={categories}
                        institutions={institutions}
                        updateSparePart={updateSparePart}
                        deleteSparePart={deleteSparePart}
                        updateLocations={updateLocations}
                    />
                ))}

                {spareParts.length === 0 && (
                    <div className="text-center py-12 bg-white border border-slate-200 rounded-lg">
                        <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600">Запчастини не знайдено</p>
                    </div>
                )}
            </div>

            <div className="hidden md:block">
                {spareParts.length === 0 ? (
                    <div className="text-center py-12 bg-white border border-slate-200 rounded-lg">
                        <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600">Запчастини не знайдено</p>
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="
                            grid
                            grid-cols-[minmax(0,5fr)_minmax(0,2fr)_minmax(0,2fr)_auto]
                            lg:grid-cols-[minmax(0,3fr)_minmax(0,2.4fr)_minmax(0,2fr)_minmax(0,2.4fr)_auto]
                            gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200
                            text-xs text-slate-600 uppercase tracking-wider text-left
                        ">
                            <div className="text-left">Запчастина</div>
                            <div className="text-center">Локації</div>
                            <div className="hidden lg:block text-left">Категорія</div>
                            <div className="text-left">Кількість</div>
                            <div className="text-right">Дії</div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {spareParts.map((part) => (
                                <SparePartItem
                                    key={part.id}
                                    sparePart={part}
                                    deleteSparePart={deleteSparePart}
                                    updateSparePart={updateSparePart}
                                    updateLocations={updateLocations}
                                    institutions={institutions}
                                    models={models}
                                    categories={categories}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>

    );
};

export default SparePartsTable;