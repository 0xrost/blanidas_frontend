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
import {
    getEffectiveNewQuantity,
    getEffectiveRestoredQuantity
} from "@/presentation/components/tabs/repair-request-details/spare-parts/utils.ts";
import type {Institution} from "@/domain/entities/institution.ts";

interface UsedSparePartFormData {
    note: string;
    newQuantity: number;
    restoredQuantity: number;
    institution: Institution | null;
}

type SelectSparePartProps = {
    newUsedSpareParts: RepairRequestUsedSparePartVM[];
    deletedSpareParts: RepairRequestUsedSparePartVM[];
    sparePart: SparePart;
    formData: UsedSparePartFormData;
    onValueChange: <K extends keyof UsedSparePartFormData>(key: K, value: UsedSparePartFormData[K]) => void;
}
const SparePartLocationDetails = ({ sparePart, newUsedSpareParts, deletedSpareParts, formData, onValueChange }: SelectSparePartProps) => {
    const quantitiesByInstitution = useMemo(() => {
        const map = new Map<string, { newQuantity: number, restoredQuantity: number }>();

        sparePart.locations.forEach(location => {
            map.set(
                location.institution.id,
                {
                    newQuantity: getEffectiveNewQuantity(
                        newUsedSpareParts,
                        deletedSpareParts,
                        sparePart.id,
                        location
                    ),
                    restoredQuantity: getEffectiveRestoredQuantity(
                        newUsedSpareParts,
                        deletedSpareParts,
                        sparePart.id,
                        location
                    )
                }
            );
        });

        return map;
    }, [newUsedSpareParts, deletedSpareParts, sparePart]);

    return (
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <div className="flex flex-col gap-2">
                <p className="text-md font-medium text-slate-900">{sparePart.name}</p>
                <div className="">
                    <p className="text-xs text-slate-500 tracking-wide mb-1">Наявність на складах</p>
                    <div className="rounded-md overflow-hidden border border-slate-200">
                        {sparePart.locations.map((location) => {
                            const quantities = quantitiesByInstitution.get(location.institution.id) ?? { newQuantity: 0, restoredQuantity: 0 };
                            return (
                                <div
                                    key={location.institution.id}
                                    className="flex items-center last:border-b-0 justify-between bg-white border-b border-slate-200 px-3.5 py-3"
                                >
                                    <div className="flex text-sm items-center gap-2.5 flex-1 min-w-0">
                                        {location.institution.name}
                                    </div>
                                    <div className="flex text-xs text-slate-600 font-medium  gap-1.5">
                                        <span className="text-xs border border-slate-200 rounded-md px-2 py-1">
                                            {quantities.newQuantity} нові
                                        </span>
                                        <span className="border border-slate-200 rounded-md px-2 py-1">
                                            {quantities.restoredQuantity} відновл.
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {sparePart.totalQuantity === 0 && (
                <div className="mt-0 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-700 font-medium">Запчастина відсутня на складах</p>
                    <p className="text-xs text-red-600 mt-1">
                        Всі запчастини використані. Зверніться до менеджера для замовлення нових.
                    </p>
                </div>
            )}

            <div className="grid grid-col-2 space-y-4 mt-2 space-x-2">
                <div className="col-span-2">
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
                                const quantities = quantitiesByInstitution.get(location.institution.id) ?? { newQuantity: 0, restoredQuantity: 0 };
                                const totalQuantity = quantities.newQuantity + quantities.restoredQuantity;
                                return (
                                    <SelectItem
                                        key={location.institution.id}
                                        value={location.institution.id}
                                        disabled={totalQuantity === 0}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span>{location.institution?.name}</span>
                                            <span className={`ml-4 text-nowrap
                                                ${totalQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {totalQuantity > 0 ? `${totalQuantity} шт.` : 'Немає'}
                                            </span>
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="part-new-quantity" className="text-slate-700">Нова кількість</Label>
                    <Input
                        id="part-new-quantity"
                        type="number"
                        min="0"
                        disabled={sparePart.totalQuantity === 0}
                        max={formData.institution ? (quantitiesByInstitution.get(formData.institution.id)?.newQuantity ?? 0) : 0}
                        value={formData.newQuantity}
                        onChange={(e) => {
                            const max = formData.institution ? (quantitiesByInstitution.get(formData.institution.id)?.newQuantity ?? 0) : 0
                            const newValue = (+e.target.value > max) ? max : +e.target.value;
                            onValueChange("newQuantity", newValue);
                        }}
                        className="bg-white h-12 mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="part-restored-quantity" className="text-slate-700">Відновлена кількість</Label>
                    <Input
                        id="part-restored-quantity"
                        type="number"
                        min="0"
                        disabled={sparePart.totalQuantity === 0}
                        max={formData.institution ? (quantitiesByInstitution.get(formData.institution.id)?.restoredQuantity ?? 0) : 0}
                        value={formData.restoredQuantity}
                        onChange={(e) => {
                            const max = formData.institution ? (quantitiesByInstitution.get(formData.institution.id)?.restoredQuantity ?? 0) : 0
                            const newValue = (+e.target.value > max) ? max : +e.target.value;
                            onValueChange("restoredQuantity", newValue);
                        }}
                        className="bg-white h-12 mt-2"
                    />
                </div>

                <div className="col-span-2">
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