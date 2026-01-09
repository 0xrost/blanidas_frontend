import {AlertTriangle, MapPin, X} from "lucide-react";
import {Label} from "@/presentation/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Textarea} from "@/presentation/components/ui/textarea.tsx";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {
    RepairRequestUsedSparePartVM
} from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import {useMemo} from "react";
import {getEffectiveQuantity} from "@/presentation/components/tabs/repair-request-details/spare-parts/utils.ts";
import type {Institution} from "@/domain/entities/institution.ts";

interface UsedSparePartFormData {
    note: string;
    quantity: number;
    institution: Institution | null;
}

type SelectSparePartProps = {
    newUsedSpareParts: RepairRequestUsedSparePartVM[];
    deletedSpareParts: RepairRequestUsedSparePartVM[];

    sparePart: SparePart;

    close: () => void;

    formData: UsedSparePartFormData;
    onValueChange: <K extends keyof UsedSparePartFormData>(key: K, value: UsedSparePartFormData[K]) => void;
}
const SparePartLocationDetails = ({ sparePart, newUsedSpareParts, deletedSpareParts, close, formData, onValueChange }: SelectSparePartProps) => {
    const quantitiesByInstitution = useMemo(() => {
        const map = new Map<string, number>();

        sparePart.locations.forEach(location => {
            map.set(
                location.institution.id,
                getEffectiveQuantity(
                    newUsedSpareParts,
                    deletedSpareParts,
                    sparePart.id,
                    location
                )
            );
        });

        return map;
    }, [newUsedSpareParts, deletedSpareParts, sparePart]);

    return (
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-slate-900 mb-1">{sparePart.name}</p>
                        <button
                            onClick={close}
                            className="mr-1 p-1 hover:bg-cyan-100 rounded transition-colors">
                            <X className="w-4 h-4 text-slate-600" />
                        </button>
                    </div>
                    <div className={`bg-white rounded-lg p-3 ${sparePart.totalQuantity === 0 ? "" : "mb-4"}`}>
                        <p className="text-xs text-slate-600 mb-2">Наявність на складах:</p>
                        <div className="space-y-2">
                            {sparePart.locations.map((location) => {
                                const quantity = quantitiesByInstitution.get(location.institution.id) ?? 0;
                                return (
                                    <div key={location.institution.id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3 text-slate-400" />
                                            <span className="text-slate-700">{location.institution.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <span className={`${quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {quantity} шт.
                                          </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {sparePart.totalQuantity === 0 && (
                <div className="mt-0 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm text-red-700 font-medium">Запчастина відсутня на складах</p>
                            <p className="text-xs text-red-600 mt-1">
                                Всі запчастини використані. Зверніться до менеджера для замовлення нових.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <Label htmlFor="part-warehouse" className="text-slate-700">Оберіть склад *</Label>
                    <Select
                        disabled={sparePart.totalQuantity === 0}
                        value={formData.institution?.id ?? ""}
                        onValueChange={(value) => {
                            const institution = sparePart.locations.find(
                                l => l.institution.id === value
                            )?.institution;

                            if (institution) {
                                onValueChange("institution", institution);
                            }
                        }}
                    >
                        <SelectTrigger className="bg-white w-full h-12 mt-2">
                            <SelectValue placeholder="Оберіть склад..." />
                        </SelectTrigger>
                        <SelectContent>
                            {sparePart.locations.map((location) => {
                                const quantity = quantitiesByInstitution.get(location.institution.id) ?? 0;
                                return (
                                    <SelectItem
                                        key={location.institution.id}
                                        value={location.institution.id}
                                        disabled={quantity === 0}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span>{location.institution?.name}</span>
                                            <span className={`ml-4
                                                ${quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {quantity > 0 ? `${quantity} шт.` : 'Немає'}
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
                        disabled={sparePart.totalQuantity === 0}
                        max={formData.institution ? quantitiesByInstitution.get(formData.institution.id) ?? 0 : 0}
                        value={formData.quantity}
                        onChange={(e) => {
                            const max = formData.institution ? quantitiesByInstitution.get(formData.institution.id) ?? 0 : 0
                            const newValue = (+e.target.value > max) ? max : +e.target.value;
                            onValueChange("quantity", newValue);
                        }}
                        className="bg-white h-12 mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="part-note" className="text-slate-700">Примітка (необов'язково)</Label>
                    <Textarea
                        id="part-note"
                        disabled={sparePart.totalQuantity === 0}
                        value={formData.note ?? ""}
                        onChange={(e) => {onValueChange("note", e.target.value)}}
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
export type { UsedSparePartFormData }