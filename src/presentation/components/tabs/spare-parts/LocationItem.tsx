import {MapPin, Minus, Plus, Trash2} from "lucide-react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {UILocation} from "@/presentation/components/tabs/spare-parts/models.ts";

interface Props {
    location: UILocation;

    remove(): void;
    changeQuantity(quantity: number): void
}
const LocationItem = ({ location, remove, changeQuantity }: Props) => {
    return (
        <div
            key={location.institution.id}
            className="flex items-center justify-between py-2 px-3 bg-white border border-slate-200 rounded"
        >
            <div className="flex items-center gap-3 flex-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                <div className="flex-1">
                    <p className="text-sm text-slate-900">{location.institution.name}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className={`text-sm ${location.quantity > 0 ? 'text-slate-900' : 'text-red-600'}`}>
                        <Input
                            min={1}
                            type="number"
                            inputMode="numeric"
                            value={location.quantity}
                            onChange={(e) => changeQuantity(+e.target.value)}
                            className="w-16 p-0 text-right hide-number-spinner focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 shadow-none h-8 border-slate-300 rounded-md focus:ring-blue-500"
                        />
                        <span className="ml-1">шт.</span>
                    </p>
                </div>

                <div className="flex gap-1">
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={location.quantity === 1}
                        className="h-7 w-7 p-0"
                        onClick={() => changeQuantity(location.quantity - 1)}
                    >
                        <Minus className="w-3 h-3" />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() => changeQuantity(location.quantity + 1)}
                    >
                        <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={remove}
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="w-3 h-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LocationItem;