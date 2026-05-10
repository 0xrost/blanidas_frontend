import { Button } from "@/presentation/components/ui/button.tsx";
import { Package, Plus, Trash2 } from "lucide-react";
import type { RepairRequestUsedSparePartVM } from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import { useEffect, useMemo, useState } from "react";
import SparePartCardModal from "@/presentation/components/tabs/repair-request-details/spare-parts/SparePartCardModal.tsx";

type SparePartCardProps = {
    usedSpareParts: RepairRequestUsedSparePartVM[];
    isReadonly: boolean;
    setIdDirty: (value: boolean) => void;
    setUsedSparePartsToUpdate: (value: RepairRequestUsedSparePartVM[]) => void;
};

const SparePartCard = ({ usedSpareParts, setIdDirty, setUsedSparePartsToUpdate, isReadonly }: SparePartCardProps) => {
    const [localUsedSpareParts, setLocalUsedSpareParts] = useState<RepairRequestUsedSparePartVM[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { addedUsedSpareParts, deletedUsedSpareParts } = useMemo(() => {
        const addedUsedSpareParts: RepairRequestUsedSparePartVM[] = [];
        const deletedUsedSpareParts: RepairRequestUsedSparePartVM[] = [];

        const key = (x: RepairRequestUsedSparePartVM) => `${x.sparePart.id}_${x.institution.id}`;

        const original = new Map(usedSpareParts.map(x => [key(x), x]));
        const current = new Map(localUsedSpareParts.map(x => [key(x), x]));

        for (const [k, oldItem] of original) {
            const cur = current.get(k);
            if (!cur) {
                deletedUsedSpareParts.push(oldItem);
                continue;
            }
            if (cur.newQuantity < oldItem.newQuantity) {
                deletedUsedSpareParts.push({ ...oldItem, newQuantity: oldItem.newQuantity - cur.newQuantity });
            }
        }

        for (const [k, cur] of current) {
            const oldItem = original.get(k);
            if (!oldItem) {
                addedUsedSpareParts.push(cur);
                continue;
            }
            if (cur.newQuantity > oldItem.newQuantity) {
                addedUsedSpareParts.push({ ...cur, newQuantity: cur.newQuantity - oldItem.newQuantity });
            }
        }

        return { addedUsedSpareParts, deletedUsedSpareParts };
    }, [usedSpareParts, localUsedSpareParts]);

    useEffect(() => { setUsedSparePartsToUpdate(localUsedSpareParts); }, [setUsedSparePartsToUpdate, localUsedSpareParts]);

    useEffect(() => {
        setLocalUsedSpareParts(prev => (prev.length === 0 ? usedSpareParts : prev));
    }, [usedSpareParts]);

    useEffect(() => {
        setIdDirty(deletedUsedSpareParts.length > 0 || addedUsedSpareParts.length > 0);
    }, [setIdDirty, deletedUsedSpareParts, addedUsedSpareParts]);

    const onAdd = (value: RepairRequestUsedSparePartVM) => {
        setLocalUsedSpareParts(prev => {
            const index = prev.findIndex(
                p => p.sparePart.id === value.sparePart.id && p.institution.id === value.institution.id
            );
            if (index !== -1) {
                return prev.map((p, i) =>
                    i === index
                        ? { ...p, newQuantity: p.newQuantity + value.newQuantity, restoredQuantity: p.restoredQuantity + value.restoredQuantity }
                        : p
                );
            }
            return [...prev, value];
        });
    };

    const onDelete = (sparePartId: string, institutionId: string): void => {
        setLocalUsedSpareParts(prev =>
            prev.filter(x => x.institution.id !== institutionId || x.sparePart.id !== sparePartId)
        );
    };

    return (
        <>
            <div className="bg-white">
                <div className="px-4 py-3 text-slate-900 flex border-b items-center justify-between">
                    <p>Використані запчастини</p>
                    {!isReadonly && (
                        <Button onClick={() => setIsModalOpen(true)} className="flex items-center text-white">
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:block">Додати запчастину</span>
                        </Button>
                    )}
                </div>

                {localUsedSpareParts && localUsedSpareParts.length > 0 ? (
                    <>
                        <div className="hidden md:block overflow-x-auto">
                            <div className={`${isReadonly ? "grid-cols-[1.6fr_2fr_0.6fr]" : "grid-cols-[1.6fr_2fr_0.6fr_0.2fr]"} px-4 py-3 grid border-b border-slate-200`}>
                                <div className="text-sm font-medium text-slate-600">Назва</div>
                                <div className="text-sm font-medium text-slate-600">Примітка</div>
                                <div className="text-sm font-medium text-slate-600">Кількість</div>
                                {!isReadonly && <div className="text-right text-sm font-medium text-slate-600">Дії</div>}
                            </div>

                            {localUsedSpareParts.map(part => (
                                <div
                                    key={`${part.newQuantity}_${part.restoredQuantity}_${part.sparePart?.id}_${part.institution?.id}`}
                                    className={`px-4 py-3 grid ${isReadonly ? "grid-cols-[1.6fr_2fr_0.6fr]" : "grid-cols-[1.6fr_2fr_0.6fr_0.2fr]"} items-center border-b border-slate-200 hover:bg-slate-50`}
                                >
                                    <div className="text-sm text-slate-900">
                                        <p>{part.sparePart?.name}</p>
                                        <p className="text-slate-600 text-xs" title={part.institution?.name}>{part.institution?.name}</p>
                                    </div>
                                    <p className="text-sm text-slate-600">{part.note}</p>
                                    <div className="flex items-center gap-2 text-center text-slate-600">
                                        <div>
                                            <p className="text-xs">Нові</p>
                                            <p className="text-sm font-semibold">{part.newQuantity}</p>
                                        </div>
                                        <div className="w-px h-6 bg-slate-200" />
                                        <div>
                                            <p className="text-xs">Відновл.</p>
                                            <p className="text-sm font-semibold">{part.restoredQuantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        {!isReadonly && (
                                            <button
                                                onClick={() => onDelete(part.sparePart.id, part.institution.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:hidden">
                            {localUsedSpareParts.map(part => (
                                <div
                                    key={`${part.newQuantity}_${part.restoredQuantity}_${part.sparePart?.id}_${part.institution?.id}`}
                                    className="border-b border-slate-200 p-4"
                                >
                                    <div className="mb-2">
                                        <p className="text-sm font-medium text-slate-900" title={part.sparePart?.name}>{part.sparePart?.name}</p>
                                        <p className="text-xs text-slate-600" title={part.institution?.name}>{part.institution?.name}</p>
                                    </div>

                                    {part.note && (<p className="text-sm text-slate-600">{part.note}</p>)}

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2 text-xs">
                                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                                                <b>{part.newQuantity}</b> нові
                                            </span>
                                            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                                                <b>{part.restoredQuantity}</b> відновл.
                                            </span>
                                        </div>

                                        {!isReadonly && (
                                            <button
                                                onClick={() => onDelete(part.sparePart.id, part.institution.id)}
                                                className="text-red-500 hover:text-red-700"
                                                aria-label="Видалити"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8 bg-slate-50 border-b">
                        <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                        <p className="text-slate-500">Запчастини {!isReadonly && "ще"} не додано</p>
                    </div>
                )}
            </div>

            <SparePartCardModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                newUsedSpareParts={addedUsedSpareParts}
                deletedSpareParts={deletedUsedSpareParts}
                addUsedSpareParts={onAdd}
            />
        </>
    );
};

export default SparePartCard;