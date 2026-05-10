import { Package, Plus, Search, ArrowLeft, X } from "lucide-react";
import { Input } from "@/presentation/components/ui/input.tsx";
import { useEffect, useMemo, useState } from "react";
import { useSpareParts } from "@/presentation/hooks/entities/spare-part.ts";
import type { SparePart } from "@/domain/entities/spare-part.ts";
import { Button } from "@/presentation/components/ui/button.tsx";
import SparePartLocationDetails, {
    type UsedSparePartFormData
} from "@/presentation/components/tabs/repair-request-details/spare-parts/SparePartLocationDetails.tsx";
import type {
    RepairRequestUsedSparePartVM
} from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import { getEffectivePartQuantity } from "@/presentation/components/tabs/repair-request-details/spare-parts/utils.ts";
import { SortByNameAsc } from "@/domain/sorting.ts";
import { Dialog, DialogContent } from "@/presentation/components/ui/dialog.tsx";

const createEmptyFormData = (): UsedSparePartFormData => ({
    note: "",
    newQuantity: 0,
    restoredQuantity: 0,
    institution: null,
});

type SparePartCardModalProps = {
    isOpen: boolean;
    close: () => void;
    newUsedSpareParts: RepairRequestUsedSparePartVM[];
    deletedSpareParts: RepairRequestUsedSparePartVM[];
    addUsedSpareParts: (value: RepairRequestUsedSparePartVM) => void;
};

const SparePartCardModal = ({
    isOpen,
    close,
    newUsedSpareParts,
    deletedSpareParts,
    addUsedSpareParts,
}: SparePartCardModalProps) => {
    const [search, setSearch] = useState("");
    const [currentSparePart, setCurrentSparePart] = useState<SparePart | null>(null);
    const [usedSparePartFormData, setUsedSparePartFormData] = useState<UsedSparePartFormData>(createEmptyFormData());

    const { data: sparePartsPagination, refetch } = useSpareParts({
        pagination: { page: 1, limit: 15 },
        filters: { name: search.trim().length > 2 ? search.trim() : "" },
        sorting: SortByNameAsc,
    });

    useEffect(() => {
        if (isOpen) refetch();
    }, [isOpen, refetch]);

    const effectiveQuantities = useMemo(() => {
        const map = new Map<string, number>();
        sparePartsPagination?.items.forEach((part) => {
            map.set(part.id, getEffectivePartQuantity(newUsedSpareParts, deletedSpareParts, part));
        });
        return map;
    }, [sparePartsPagination?.items, newUsedSpareParts, deletedSpareParts]);

    const onClose = () => {
        setUsedSparePartFormData(createEmptyFormData());
        setCurrentSparePart(null);
        setSearch("");
        close();
    };

    const onSubmit = () => {
        if (currentSparePart == null || usedSparePartFormData.institution == null) return;
        if (usedSparePartFormData.newQuantity + usedSparePartFormData.restoredQuantity <= 0) return;

        addUsedSpareParts({
            ...usedSparePartFormData,
            sparePart: currentSparePart,
            institution: usedSparePartFormData.institution,
        });

        onClose();
    };

    const canSubmit =
        currentSparePart != null &&
        usedSparePartFormData.institution != null &&
        usedSparePartFormData.newQuantity + usedSparePartFormData.restoredQuantity > 0;

    const items = sparePartsPagination?.items ?? [];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent 
                showCloseButton={false}
                className="p-0 gap-0 max-w-xl max-h-[85vh] overflow-hidden rounded-lg border border-slate-200 shadow-lg"
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                    {currentSparePart ? (
                        <button
                            onClick={() => setCurrentSparePart(null)}
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Назад
                        </button>
                    ) : (
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                            Додати запчастину
                        </h2>
                    )}
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-700 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="overflow-y-auto sm:px-5 sm:py-3" style={{ maxHeight: "calc(85vh - 120px)" }}>
                    {currentSparePart ? (
                        <SparePartLocationDetails
                            sparePart={currentSparePart}
                            newUsedSpareParts={newUsedSpareParts}
                            deletedSpareParts={deletedSpareParts}
                            formData={usedSparePartFormData}
                            onValueChange={(key, value) =>
                                setUsedSparePartFormData((prev) => ({ ...prev, [key]: value }))
                            }
                        />
                    ) : (
                        <div className=" space-y-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <Input
                                    id="search-part"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Пошук за назвою..."
                                    className="pl-9 h-9 text-sm border-slate-300 rounded focus:ring-0 focus:border-slate-500"
                                />
                            </div>

                            {items.length > 0 ? (
                                <div className="border border-slate-200 rounded divide-y divide-slate-100 overflow-hidden">
                                    {items.map((part) => {
                                        const quantity = effectiveQuantities.get(part.id) ?? 0;
                                        const inStock = quantity > 0;
                                        return (
                                            <button
                                                key={part.id}
                                                onClick={() => {
                                                    setCurrentSparePart(part);
                                                    setSearch("");
                                                }}
                                                className="w-full text-left px-4 py-2.5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                                            >
                                                <span className="text-sm text-slate-800">{part.name}</span>
                                                <span className={`text-xs flex-shrink-0 ${inStock ? "text-slate-700" : "text-slate-400"}`}>
                                                    {inStock ? `${quantity} шт.` : "Відсутня"}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="border border-slate-200 rounded py-10 text-center">
                                    <Package className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                                    <p className="text-sm text-slate-400">Запчастини не знайдено</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="px-5 py-4 border-t border-slate-200">
                    <Button
                        onClick={onSubmit}
                        disabled={!canSubmit}
                        className="w-full h-9 text-sm font-medium rounded bg-slate-900 text-white hover:bg-slate-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-1.5" />
                        Додати запчастину
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SparePartCardModal;