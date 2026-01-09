import {Package, Plus, Search, X} from "lucide-react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {useMemo, useState} from "react";
import {useSpareParts} from "@/presentation/hooks/entities/spare-part.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {Badge} from "@/presentation/components/ui/badge.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import SparePartLocationDetails, {
    type UsedSparePartFormData
} from "@/presentation/components/tabs/repair-request-details/spare-parts/SparePartLocationDetails.tsx";
import type {
    RepairRequestUsedSparePartVM
} from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import {getEffectivePartQuantity} from "@/presentation/components/tabs/repair-request-details/spare-parts/utils.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/presentation/components/ui/dialog.tsx";

const createEmptyFormData = (): UsedSparePartFormData => ({
    note: "",
    quantity: 1,
    institution: null,
});

type SparePartCardModalProps = {
    isOpen: boolean;
    close: () => void;

    newUsedSpareParts: RepairRequestUsedSparePartVM[];
    deletedSpareParts: RepairRequestUsedSparePartVM[];
    addUsedSpareParts: (value: RepairRequestUsedSparePartVM) => void;
}
const SparePartCardModal = ({ isOpen, close, newUsedSpareParts, deletedSpareParts, addUsedSpareParts }: SparePartCardModalProps) => {
    const [search, setSearch] = useState("");

    const [currentSparePart, setCurrentSparePart] = useState<SparePart | null>(null);
    const [usedSparePartFormData, setUsedSparePartFormData] = useState<UsedSparePartFormData>(createEmptyFormData());

    const { data: sparePartsPagination } = useSpareParts({
        pagination:{ page: 1, limit: 15 },
        filters: { name: search.trim().length > 2 ? search.trim() : "" },
        sorting: SortByNameAsc,
    });

    const effectiveQuantities = useMemo(() => {
        const map = new Map<string, number>();

        sparePartsPagination?.items.forEach(part => {
            map.set(
                part.id,
                getEffectivePartQuantity(
                    newUsedSpareParts,
                    deletedSpareParts,
                    part
                )
            );
        });

        return map;
    }, [sparePartsPagination?.items, newUsedSpareParts, deletedSpareParts]);

    const onClose = () => {
        setUsedSparePartFormData(createEmptyFormData());
        setCurrentSparePart(null);
        setSearch("");
        close();
    }

    const onSubmit = () => {
        if (currentSparePart == null || usedSparePartFormData.institution == null) return;

        addUsedSpareParts({
            ...usedSparePartFormData,
            sparePart: currentSparePart,
            institution: usedSparePartFormData.institution,
        });

        onClose();
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogContent className="max-w-fit w-full max-h-[90vh] overflow-y-auto p-0 rounded-2xl">
                <DialogHeader className="sticky top-0 z-10 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-slate-900">
                            Додати запчастину
                        </DialogTitle>

                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                </DialogHeader>
                <div className="overflow-y-auto p-6 pt-0 space-y-6">
                    <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            id="search-part"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Введіть назву запчастини..."
                            className="pl-10 h-12 bg-slate-100"
                        />
                    </div>
                    {currentSparePart ? (
                        <SparePartLocationDetails
                            sparePart={currentSparePart}
                            newUsedSpareParts={newUsedSpareParts}
                            deletedSpareParts={deletedSpareParts}
                            close={() => setCurrentSparePart(null)}
                            formData={usedSparePartFormData}
                            onValueChange={(key, value) => {
                                setUsedSparePartFormData((prev) => ({
                                    ...prev,
                                    [key]: value,
                                }))
                            }}
                        />
                    ) : (
                        <div className="border border-slate-200 rounded-lg max-h-64 overflow-y-auto">
                            {(sparePartsPagination?.items.length ?? 0) > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {(sparePartsPagination?.items ?? []).map((part) => {
                                        const quantity = effectiveQuantities.get(part.id) ?? 0;

                                        return (
                                            <button
                                                key={part.id}
                                                onClick={() => {
                                                    setCurrentSparePart(part)
                                                    setSearch("")
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

                                                    <Badge
                                                        variant={quantity > 0 ? "secondary" : "destructive"}
                                                        className={
                                                            quantity > 0
                                                                ? "bg-green-100 text-green-700"
                                                                : ""
                                                        }
                                                    >
                                                        {quantity > 0 ? `${quantity} шт.` : "Відсутня"}
                                                    </Badge>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-slate-500">
                                    <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                    <p>Запчастини не знайдено</p>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <Button
                            onClick={onSubmit}
                            disabled={currentSparePart == null || usedSparePartFormData.institution === null}
                            className="
                                flex-1
                                bg-linear-to-r from-cyan-500 to-blue-600
                                hover:from-cyan-600 hover:to-blue-700
                                text-white
                                disabled:opacity-50 disabled:cursor-not-allowed
                            "
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Додати запчастину
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SparePartCardModal;