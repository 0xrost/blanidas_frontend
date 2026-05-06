import {MapPin, Trash2} from "lucide-react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {UILocation} from "@/presentation/components/tabs/spare-parts/models.ts";
import {useEffect, useState} from "react";

interface Props {
    location: UILocation;
    mobileView?: boolean;

    remove(): void;
    changeLocation(quantity: number, restoredQuantity: number): void
}
const LocationItem = ({ location, remove, changeLocation, mobileView = false }: Props) => {
    const [editing, setEditing] = useState<"new" | "restored" | null>(null);
    const [newQuantity, setNewQuantity] = useState<number>(location.quantity - location.restoredQuantity);
    const [restoredQuantity, setRestoredQuantity] = useState<number>(location.restoredQuantity);

    useEffect(() => {
        setNewQuantity(location.quantity - location.restoredQuantity);
        setRestoredQuantity(location.restoredQuantity);
    }, [location]);

    const commitEdit = () => {
        const newQ = newQuantity ?? 0
        const restored = restoredQuantity ?? 0;
        changeLocation(newQ + restored, restored);
        setEditing(null);
    };

    if (mobileView) {
        return (
            <div className="flex items-center justify-between gap-2 py-2 px-3 border-b border-slate-200 last:border-b-0">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 leading-5 break-words">
                        {location.institution.name}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1.5">
                        {editing === "new" ? (
                            <Input
                                autoFocus
                                min={0}
                                type="number"
                                inputMode="numeric"
                                value={newQuantity}
                                onChange={(e) => setNewQuantity(+e.target.value)}
                                onBlur={commitEdit}
                                className="h-6 w-20 text-right text-xs"
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={() => setEditing("new")}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium transition-colors"
                            >
                                {newQuantity} нові
                            </button>
                        )}

                        {editing === "restored" ? (
                            <Input
                                autoFocus
                                min={0}
                                type="number"
                                inputMode="numeric"
                                value={restoredQuantity}
                                onChange={(e) => setRestoredQuantity(+e.target.value)}
                                onBlur={commitEdit}
                                className="h-6 w-20 text-right text-xs"
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={() => setEditing("restored")}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-xs font-medium transition-colors"
                            >
                                {restoredQuantity} відновл.
                            </button>
                        )}
                    </div>
                </div>

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
                min={0}
                type="number"
                inputMode="numeric"
                value={newQuantity}
                onBlur={commitEdit}
                onKeyDown={(e) => { if (e.key === "Enter") commitEdit() }}
                onChange={(e) => setNewQuantity(+e.target.value)}
                className="h-8 text-center shadow-none"
            />

            <Input
                min={0}
                type="number"
                inputMode="numeric"
                value={restoredQuantity}
                onBlur={commitEdit}
                onKeyDown={(e) => { if (e.key === "Enter") commitEdit() }}
                onChange={(e) => setRestoredQuantity(+e.target.value)}
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