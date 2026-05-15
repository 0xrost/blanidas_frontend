import { MapPin, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select.tsx";
import { Input } from "@/presentation/components/ui/input.tsx";
import { Button } from "@/presentation/components/ui/button.tsx";
import type { Institution } from "@/domain/entities/institution.ts";
import { useState } from "react";
import type { UILocation } from "@/presentation/components/tabs/spare-parts/models.ts";
import { useNumericInput } from "@/presentation/hooks/useNumericInput";

interface Props {
    institutions: Institution[];
    submit(data: UILocation): void;
    mobilePanel?: boolean;
    onSubmitted?: () => void;
}

const LocationForm = ({ institutions, submit, mobilePanel = false, onSubmitted }: Props) => {
    const [institutionId, setInstitutionId] = useState<string | null>(null);
    const newQuantity = useNumericInput(0);
    const restoredQuantity = useNumericInput(0);

    const isValid = institutionId !== null && newQuantity.value >= 0 && restoredQuantity.value >= 0;

    const onSubmit = () => {
        if (!isValid || institutionId === null) return;
        const institution = institutions.find(x => x.id === institutionId);
        if (!institution) return;

        submit({
            newQuantity: newQuantity.value,
            restoredQuantity: restoredQuantity.value,
            institution,
        });

        setInstitutionId(null);
        newQuantity.reset();
        restoredQuantity.reset();
        onSubmitted?.();
    };

    const numericInputClass = mobilePanel ? "h-10 bg-white text-center" : "h-9 bg-white text-center";

    const institutionSelect = (
        <Select value={institutionId ?? ''} onValueChange={setInstitutionId}>
            <SelectTrigger className={`w-full bg-white flex items-center justify-between truncate pr-2 ${mobilePanel ? 'h-10' : 'h-9'}`}>
                <div className="flex items-center min-w-0">
                    <MapPin className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                    <SelectValue className="text-left truncate" placeholder="Оберіть склад" />
                </div>
            </SelectTrigger>
            <SelectContent>
                {institutions.map(institution => (
                    <SelectItem key={institution.id} value={institution.id}>
                        {institution.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );

    if (mobilePanel) {
        return (
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 space-y-3">
                {institutionSelect}
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <p className="text-xs text-slate-600">Нові, шт.</p>
                        <Input min={0} type="number" inputMode="numeric" {...newQuantity.inputProps} className={numericInputClass} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-600">Відновлено, шт.</p>
                        <Input min={0} type="number" inputMode="numeric" {...restoredQuantity.inputProps} className={numericInputClass} />
                    </div>
                </div>
                <Button size="sm" onClick={onSubmit} disabled={!isValid} className="h-10 w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                    Додати склад
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_84px_84px_40px] gap-2 items-center py-2 px-2 rounded-md border border-slate-200 bg-slate-50">
            {institutionSelect}
            <Input min={0} type="number" inputMode="numeric" {...newQuantity.inputProps} className={numericInputClass} />
            <Input min={0} type="number" inputMode="numeric" {...restoredQuantity.inputProps} className={numericInputClass} />
            <Button size="sm" onClick={onSubmit} disabled={!isValid} className="h-9 w-9 p-0 bg-cyan-500 hover:bg-cyan-600 text-white">
                <Plus className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default LocationForm;