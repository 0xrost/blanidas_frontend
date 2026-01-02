import {Label} from "@/presentation/components/ui/label.tsx";
import {Package, Plus, Search, X} from "lucide-react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {useEffect, useState} from "react";
import {useSpareParts} from "@/presentation/hooks/entities/spare-part.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {Badge} from "@/presentation/components/ui/badge.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import SparePartLocationDetails from "@/presentation/components/tabs/repair-request-details/spare-part-modal/SparePartLocationDetails.tsx";
import type {
    RepairRequestUsedSparePartVM
} from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import {getEffectivePartQuantity} from "@/presentation/components/tabs/repair-request-details/spare-part-modal/utils.ts";



type SparePartCardModalProps = {
    onHideSparePartModal: () => void;
    newUsedSpareParts: RepairRequestUsedSparePartVM[];
    setUsedSpareParts: (value: RepairRequestUsedSparePartVM[]) => void;
}
const SparePartCardModal = ({ onHideSparePartModal, newUsedSpareParts, setUsedSpareParts }: SparePartCardModalProps) => {
    const [search, setSearch] = useState("");
    const [currentSparePart, setCurrentSparePart] = useState<SparePart | null>(null);
    const [sparePartFormData, setSparePartFormData] = useState<RepairRequestUsedSparePartVM>({
        note: "",
        quantity: 1,
        institution: null,
        sparePart: null,
    });

    const isSearchLongEnough = search.trim().length > 2;
    const onSubmit = () => {
        if (currentSparePart === null) {
            return;
        }

        const index = newUsedSpareParts.findIndex(x =>
            x.institution?.id === sparePartFormData.institution?.id &&
            x.sparePart?.id === sparePartFormData.sparePart?.id
        );

        let updated: typeof newUsedSpareParts;
        if (index !== -1) {
            updated = newUsedSpareParts.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        quantity: item.quantity + sparePartFormData.quantity
                    }
                    : item
            );
        } else {
            updated = [...newUsedSpareParts, sparePartFormData];
        }

        setUsedSpareParts(updated);
        onHideSparePartModal();
    }

    const { data: sparePartsPagination, refetch } = useSpareParts(
        { page: 1, limit: 15 },
        { name: search },
        { enabled: false }
    );

    useEffect(() => {
        if (isSearchLongEnough) {
            const interval = setTimeout(() => refetch(), 500);
            return () => clearTimeout(interval);
        }
    }, [isSearchLongEnough, refetch]);

    console.log(sparePartsPagination);
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-slate-900">Додати запчастину</h3>
                        <button
                            onClick={() => {
                                setSearch("");
                                onHideSparePartModal()
                            }}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <Label htmlFor="search-part">Пошук запчастини</Label>
                        <div className="relative mt-2">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                id="search-part"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Введіть назву запчастини..."
                                className="pl-10 h-12"
                            />
                        </div>
                    </div>

                    {isSearchLongEnough && currentSparePart === null && (
                        <div className="border border-slate-200 rounded-lg max-h-64 overflow-y-auto">
                            {(sparePartsPagination?.items.length ?? 0) > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {(sparePartsPagination?.items ?? []).map((part) => (
                                        <button
                                            key={part.id}
                                            onClick={() => {
                                                setCurrentSparePart(part);
                                                setSearch("");
                                            }}
                                            className="w-full text-left p-4 hover:bg-cyan-50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Package className="w-4 h-4 text-slate-400" />
                                                        <p className="text-slate-900">{part.name}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge
                                                        variant={getEffectivePartQuantity(newUsedSpareParts, part) > 0 ? 'secondary' : 'destructive'}
                                                        className={getEffectivePartQuantity(newUsedSpareParts, part) > 0 ? 'bg-green-100 text-green-700' : ''}
                                                    >
                                                        {getEffectivePartQuantity(newUsedSpareParts, part) > 0 ? `${getEffectivePartQuantity(newUsedSpareParts, part)} шт.` : 'Відсутня'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-slate-500">
                                    <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                    <p>Запчастини не знайдено</p>
                                </div>
                            )}
                        </div>
                    )}

                    {currentSparePart !== null &&
                        <SparePartLocationDetails
                            sparePart={currentSparePart}
                            newUsedSpareParts={newUsedSpareParts}
                            onClose={() => setCurrentSparePart(null)}
                            setFormData={setSparePartFormData}
                        />
                    }

                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <Button
                            onClick={onSubmit}
                            disabled={sparePartFormData.institution === null}
                            className="flex-1 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Додати запчастину
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SparePartCardModal;