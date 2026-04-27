import {MapPin, Plus} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {Institution} from "@/domain/entities/institution.ts";
import {useState} from "react";
import type {UILocation} from "@/presentation/components/tabs/spare-parts/models.ts";

interface Props {
    institutions: Institution[];
    submit(data: UILocation): void;
    mobilePanel?: boolean;
    onSubmitted?: () => void;
}
const LocationForm = ({ institutions, submit, mobilePanel = false, onSubmitted }: Props) => {
    const emptyForm = { institutionId: null, quantity: 1, restoredQuantity: 0 };
    const [formData, setFormData] = useState<{
        institutionId: string | null;
        quantity: number;
        restoredQuantity: number;
    }>(emptyForm);

    const isValid =
        formData.institutionId !== null &&
        formData.quantity > 0 &&
        formData.restoredQuantity >= 0 &&
        formData.restoredQuantity <= formData.quantity;

    const onSubmit = () => {
        if (!isValid || formData.institutionId === null) return;
        const institution = institutions.find(x => x.id === formData.institutionId);
        if (institution === undefined) return;

        submit({
            quantity: formData.quantity,
            restoredQuantity: formData.restoredQuantity,
            institution: institution,
        });
        setFormData(emptyForm);
        onSubmitted?.();
    }

    if (mobilePanel) {
        return (
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 space-y-3">
                <Select
                    value={formData.institutionId ?? ''}
                    onValueChange={value => {setFormData(prev => ({ ...prev, institutionId: value }))}}
                >
                    <SelectTrigger className="w-full h-10 bg-white flex items-center justify-between truncate pr-2">
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

                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <p className="text-xs text-slate-600">Всього, шт.</p>
                        <Input
                            min={1}
                            type="number"
                            inputMode="numeric"
                            value={formData.quantity}
                            onChange={(e) => setFormData((prev) => {
                                const quantity = Math.max(1, Math.trunc(Number(e.target.value) || 0));
                                return {
                                    ...prev,
                                    quantity,
                                    restoredQuantity: Math.min(prev.restoredQuantity, quantity),
                                };
                            })}
                            className="h-10 bg-white text-center"
                        />
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-600">Відновлено, шт.</p>
                        <Input
                            min={0}
                            type="number"
                            inputMode="numeric"
                            value={formData.restoredQuantity}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                restoredQuantity: Math.max(0, Math.min(Math.trunc(Number(e.target.value) || 0), prev.quantity)),
                            }))}
                            className="h-10 bg-white text-center"
                        />
                    </div>
                </div>

                <Button
                    size="sm"
                    onClick={onSubmit}
                    disabled={!isValid}
                    className="h-10 w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                    Додати склад
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_84px_84px_40px] gap-2 items-center py-2 px-2 rounded-md border border-slate-200 bg-slate-50">
            <Select
                value={formData.institutionId ?? ''}
                onValueChange={value => {setFormData(prev => ({ ...prev, institutionId: value }))}}
            >
                <SelectTrigger className="w-full h-9 bg-white flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                        <MapPin className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                        <SelectValue
                            className="text-left truncate"
                            placeholder="Оберіть склад"
                        />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {
                        institutions.map(institution => (
                            <SelectItem key={institution.id} value={institution.id}>
                                {institution.name}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <Input
                min={1}
                type="number"
                inputMode="numeric"
                value={formData.quantity}
                onChange={(e) => setFormData((prev) => {
                    const quantity = Math.max(1, Math.trunc(Number(e.target.value) || 0));
                    return {
                        ...prev,
                        quantity,
                        restoredQuantity: Math.min(prev.restoredQuantity, quantity),
                    };
                })}
                className="h-9 bg-white text-center"
            />
            <Input
                min={0}
                type="number"
                inputMode="numeric"
                value={formData.restoredQuantity}
                onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    restoredQuantity: Math.max(0, Math.min(Math.trunc(Number(e.target.value) || 0), prev.quantity)),
                }))}
                className="h-9 bg-white text-center"
            />
            <Button
                size="sm"
                onClick={onSubmit}
                disabled={!isValid}
                className="h-9 w-9 p-0 bg-cyan-500 hover:bg-cyan-600 text-white"
            >
                <Plus className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default LocationForm;