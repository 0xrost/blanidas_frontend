import {MapPin, Minus, Plus, Trash, Trash2, X} from "lucide-react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {UILocation} from "@/presentation/components/tabs/spare-parts/models.ts";
import {useState} from "react";

interface Props {
    location: UILocation;

    remove(): void;
    changeQuantity(quantity: number): void
    changeRestoredQuantity(quantity: number): void
}
const LocationItem = ({ location, remove, changeQuantity, changeRestoredQuantity }: Props) => {
    const [editing, setEditing] = useState<"quantity" | "restored" | null>(null);
    const [draft, setDraft] = useState<string>("");

    const beginEdit = (field: "quantity" | "restored") => {
        setEditing(field);
        setDraft(String(field === "quantity" ? location.quantity : location.restoredQuantity));
    };

    const commit = () => {
        if (!editing) return;
        const raw = Number(draft);
        if (!Number.isFinite(raw)) { setEditing(null); return; }

        const value = Math.trunc(raw);
        if (editing === "quantity") {
            changeQuantity(Math.max(1, value));
        } else {
            changeRestoredQuantity(Math.max(0, Math.min(value, location.quantity)));
        }
        setEditing(null);
    };

    const updateQuantityByStep = (delta: number) => {
        const nextQuantity = Math.max(1, location.quantity + delta);
        changeQuantity(nextQuantity);
        if (location.restoredQuantity > nextQuantity) {
            changeRestoredQuantity(nextQuantity);
        }
    };

    return (
        <div
            key={location.institution.id}
            className="flex sm:block flex-row items-center justify-between gap-2 py-2 px-4 rounded-xl border"
        >
            <div className="flex flex-col sm:flex-row items-left sm:items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <p className="text-sm font-medium text-slate-900">
                        {location.institution.name}
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right flex flex-row gap-2 sm:gap-0 sm:flex-col leading-tight min-w-[9rem]">
                        <div className="flex items-end justify-end gap-1">
                            {editing === "quantity" ? (
                                <Input
                                    autoFocus
                                    min={1}
                                    type="number"
                                    inputMode="numeric"
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    onBlur={commit}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") commit();
                                        if (e.key === "Escape") setEditing(null);
                                    }}
                                    className="w-20 h-8 text-right hide-number-spinner"
                                />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => beginEdit("quantity")}
                                    className="hover:underline decoration-dashed font-medium text-slate-900 text-sm tabular-nums"
                                >
                                    {location.quantity}
                                    <span className="text-xs font-medium text-slate-900 truncate"> шт. всього</span>
                                </button>
                            )}
                        </div>

                        <div className=" flex items-center justify-end gap-2">
                            {editing === "restored" ? (
                                <Input
                                    autoFocus
                                    min={0}
                                    type="number"
                                    inputMode="numeric"
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    onBlur={commit}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") commit();
                                        if (e.key === "Escape") setEditing(null);
                                    }}
                                    className="w-20 h-8 text-right hide-number-spinner"
                                />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => beginEdit("restored")}
                                    className="hover:underline decoration-dashed text-sm font-medium text-slate-900 tabular-nums"
                                >
                                    {location.restoredQuantity}
                                    <span className="text-xs font-medium text-slate-900 truncate"> відновлено</span>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex hidden sm:block gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={remove}
                            className="border-red-300 text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex sm:hidden gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={remove}
                        className="border-red-300 text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
        </div>
    );
};

export default LocationItem;