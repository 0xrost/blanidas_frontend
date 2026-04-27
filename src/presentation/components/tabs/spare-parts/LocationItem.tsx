import {MapPin, Trash2} from "lucide-react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {UILocation} from "@/presentation/components/tabs/spare-parts/models.ts";
import {useState} from "react";

interface Props {
    location: UILocation;
    mobileView?: boolean;

    remove(): void;
    changeQuantity(quantity: number): void
    changeRestoredQuantity(quantity: number): void
}
const LocationItem = ({ location, remove, changeQuantity, changeRestoredQuantity, mobileView = false }: Props) => {
    const [editing, setEditing] = useState<"quantity" | "restored" | null>(null);
    const [draft, setDraft] = useState<string>("");

    const startEdit = (field: "quantity" | "restored") => {
        setEditing(field);
        setDraft(String(field === "quantity" ? location.quantity : location.restoredQuantity));
    };

    const commitEdit = () => {
        if (!editing) return;
        const parsed = Math.trunc(Number(draft));
        if (!Number.isFinite(parsed)) {
            setEditing(null);
            return;
        }

        if (editing === "quantity") {
            const nextQuantity = Math.max(1, parsed);
            changeQuantity(nextQuantity);
            if (location.restoredQuantity > nextQuantity) {
                changeRestoredQuantity(nextQuantity);
            }
        } else {
            const nextRestored = Math.max(0, Math.min(parsed, location.quantity));
            changeRestoredQuantity(nextRestored);
        }

        setEditing(null);
    };

    if (mobileView) {
        return (
            <div className="flex items-center gap-2 py-2 px-3 border-b border-slate-200 last:border-b-0">
                <div className="flex items-start gap-2 min-w-0 flex-1">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-slate-900 leading-5 break-words">
                        {location.institution.name}
                    </p>
                </div>

                <div className="text-right flex flex-col items-end leading-tight shrink-0">
                    {editing === "quantity" ? (
                        <Input
                            autoFocus
                            min={1}
                            type="number"
                            inputMode="numeric"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onBlur={commitEdit}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") commitEdit();
                                if (e.key === "Escape") setEditing(null);
                            }}
                            className="h-7 w-20 text-right"
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => startEdit("quantity")}
                            className="text-sm font-semibold text-slate-900 hover:underline tabular-nums"
                        >
                            {location.quantity} шт.
                        </button>
                    )}
                    {editing === "restored" ? (
                        <Input
                            autoFocus
                            min={0}
                            type="number"
                            inputMode="numeric"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onBlur={commitEdit}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") commitEdit();
                                if (e.key === "Escape") setEditing(null);
                            }}
                            className="h-7 w-20 mt-1 text-right"
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => startEdit("restored")}
                            className="text-xs text-slate-500 hover:underline tabular-nums"
                        >
                            {location.restoredQuantity} відновлено
                        </button>
                    )}
                </div>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={remove}
                    className="border-red-300 text-red-700 hover:bg-red-50 h-8 w-8 p-0 shrink-0"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-[minmax(0,1fr)_84px_84px_40px] gap-2 items-center py-2 px-3 rounded-md border border-slate-200 bg-white">
            <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <p className="text-sm font-medium text-slate-900 truncate">
                    {location.institution.name}
                </p>
            </div>

            <Input
                min={1}
                type="number"
                inputMode="numeric"
                value={location.quantity}
                onChange={(e) => {
                    const value = Math.max(1, Math.trunc(Number(e.target.value) || 0));
                    changeQuantity(value);
                    if (location.restoredQuantity > value) {
                        changeRestoredQuantity(value);
                    }
                }}
                className="h-8 text-center shadow-none"
            />

            <Input
                min={0}
                type="number"
                inputMode="numeric"
                value={location.restoredQuantity}
                onChange={(e) => {
                    const value = Math.max(0, Math.trunc(Number(e.target.value) || 0));
                    changeRestoredQuantity(Math.min(value, location.quantity));
                }}
                className="h-8 text-center shadow-none"
            />

            <Button
                size="sm"
                variant="outline"
                onClick={remove}
                className="border-red-300 text-red-700 hover:bg-red-50 h-8 w-8 p-0 justify-self-end"
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default LocationItem;