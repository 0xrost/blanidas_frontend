import {MapPin, X} from "lucide-react";
import {Label} from "@/presentation/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Textarea} from "@/presentation/components/ui/textarea.tsx";
import type {Location, SparePart} from "@/domain/entities/spare-part.ts";
import type {
    RepairRequestUsedSparePartVM
} from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import {useEffect, useMemo, useState} from "react";
import {
    getEffectivePartQuantity,
    getEffectiveQuantity
} from "@/presentation/components/tabs/repair-request-details/spare-part-modal/utils.ts";


type SelectSparePartProps = {
    newUsedSpareParts: RepairRequestUsedSparePartVM[];
    sparePart: SparePart;
    onClose: () => void;
    setFormData: (data: RepairRequestUsedSparePartVM) => void;
}
const SparePartLocationDetails = ({ sparePart, newUsedSpareParts, onClose, setFormData }: SelectSparePartProps) => {
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [note, setNote] = useState<string | null>(null);

    const sparePartQuantity = useMemo(
        () => getEffectivePartQuantity(newUsedSpareParts, sparePart),
        [newUsedSpareParts, sparePart],
    )

    useEffect(() => {
        setFormData({
            note: note ?? "",
            quantity: quantity,
            institution: currentLocation?.institution ?? null,
            sparePart: sparePart,
        })
    }, [currentLocation, quantity, note, sparePart, setFormData]);

    return (
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-slate-900 mb-1">{sparePart.name}</p>
                        <button
                            onClick={onClose}
                            className="mr-1 p-1 hover:bg-cyan-100 rounded transition-colors">
                            <X className="w-4 h-4 text-slate-600" />
                        </button>
                    </div>
                    <div className="bg-white rounded-lg p-3 mb-4">
                        <p className="text-xs text-slate-600 mb-2">Наявність на складах:</p>
                        <div className="space-y-2">
                            {sparePart.locations.map((location, index) => {
                                return (
                                    <div key={index} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3 text-slate-400" />
                                            <span className="text-slate-700">{location.institution?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                              <span className={`${getEffectiveQuantity(newUsedSpareParts, sparePart.id, location) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {getEffectiveQuantity(newUsedSpareParts, sparePart.id, location)} шт.
                                              </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="part-warehouse" className="text-slate-700">Оберіть склад *</Label>
                    <Select
                        value={currentLocation?.id.toString()}
                        onValueChange={(value) => {
                            setCurrentLocation(sparePart.locations.filter(l => l.id.toString() === value)[0])
                        }}
                    >
                        <SelectTrigger className="bg-white w-full h-12 mt-2">
                            <SelectValue placeholder="Оберіть склад..." />
                        </SelectTrigger>
                        <SelectContent>
                            {sparePart.locations.map((location) => {
                                return (
                                    <SelectItem
                                        key={location.id}
                                        value={location.id.toString()}
                                        disabled={getEffectiveQuantity(newUsedSpareParts, sparePart.id, location) === 0}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span>{location.institution?.name}</span>
                                            <span className={`ml-4
                                                ${getEffectiveQuantity(newUsedSpareParts, sparePart.id, location) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {getEffectiveQuantity(newUsedSpareParts, sparePart.id, location) > 0 ? `${getEffectiveQuantity(newUsedSpareParts, sparePart.id, location)} шт.` : 'Немає'}
                                            </span>
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="part-quantity" className="text-slate-700">Кількість *</Label>
                    <Input
                        id="part-quantity"
                        type="number"
                        min="1"
                        max={sparePartQuantity}
                        value={quantity}
                        onChange={(e) => {
                            const newValue = (+e.target.value > sparePartQuantity) ? sparePartQuantity : +e.target.value;
                            setQuantity(newValue);
                        }}
                        className="bg-white h-12 mt-2"
                    />
                    {sparePartQuantity === 0 && (
                        <p className="text-sm text-red-600">
                            Запчастина повністю використана для цього ремонту
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="part-note" className="text-slate-700">Примітка (необов'язково)</Label>
                    <Textarea
                        id="part-note"
                        value={note ?? ""}
                        onChange={(e) => {setNote(e.target.value)}}
                        placeholder="Додаткова інформація про використання..."
                        className="bg-white resize-none mt-2"
                        rows={3}
                    />
                </div>
            </div>
        </div>
    );
};

export default SparePartLocationDetails;