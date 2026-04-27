import {CheckCircle2, MapPin} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {Institution} from "@/domain/entities/institution.ts";
import {useState} from "react";
import type {UILocation} from "@/presentation/components/tabs/spare-parts/models.ts";

interface Props {
    institutions: Institution[];
    submit(data: UILocation): void;
}
const LocationForm = ({ institutions, submit }: Props) => {
    const emptyForm = { institutionId: null, quantity: 1 };
    const [formData, setFormData] = useState<{
        institutionId: string | null;
        quantity: number;
    }>(emptyForm);

    const isValid = formData.institutionId !== null && formData.quantity > 0;
    const onSubmit = () => {
        if (!isValid || formData.institutionId === null) return;
        const institution = institutions.find(x => x.id === formData.institutionId);
        if (institution === undefined) return;

        submit({ quantity: formData.quantity, restoredQuantity: 0, institution: institution });
        setFormData(emptyForm);
    }

    return (
        <div className="flex items-center gap-2 py-2 px-3 bg-cyan-50 border border-cyan-200 rounded">
            <MapPin className="w-4 h-4 text-cyan-600" />
            <Select
                value={formData.institutionId ?? ''}
                onValueChange={value => {setFormData(prev => ({ ...prev, institutionId: value }))}}
            >
                <SelectTrigger className="flex-1 h-9 bg-white">
                    <SelectValue placeholder="Оберіть склад" />
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
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: +e.target.value }))}
                className="w-28 h-9 bg-white"
            />
            <Button
                size="sm"
                onClick={onSubmit}
                disabled={!isValid}
                className="h-9 px-3 bg-cyan-500 hover:bg-cyan-600 text-white"
            >
                <CheckCircle2 className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default LocationForm;