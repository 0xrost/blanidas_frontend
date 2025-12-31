import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Label} from "@/presentation/components/ui/label.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {PlusIcon, SaveIcon} from "lucide-react";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import {MultiSelect} from "@/components/ui/multi-select.tsx";
import {useEffect, useState} from "react";
import type {MutationOptions} from "@/presentation/models.ts";
import Notification from "@/presentation/components/layouts/Notification.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";

interface SparePartFormData {
    name: string;
    minQuantity: number;
    categoryId: string | null;
    supplierId: string | null;
    manufacturerId: string | null;
    compatibleModelIds: string[];
}

interface Props {
    initialValues?: SparePartFormData
    submit(data: SparePartFormData, options?: MutationOptions): void

    isOpen: boolean;
    close: () => void;

    categories: SparePartCategory[];
    suppliers: Supplier[];
    models: EquipmentModel[];
    manufacturers: Manufacturer[];
}
const SparePartFormModal = ({
    isOpen, close, initialValues, submit, categories, suppliers, models, manufacturers
}: Props) => {
    const emptyForm: SparePartFormData = {
        name: "",
        minQuantity: 1,
        categoryId: null,
        supplierId: null,
        manufacturerId: null,
        compatibleModelIds: [],
    };

    const [error, setError] = useTimedError<boolean>(false, 5000);
    const [formData, setFormData] = useState<SparePartFormData>(emptyForm);

    useEffect(() => {
        if (!initialValues) {
            setFormData(emptyForm);
            return;
        }

        setFormData({
            name: initialValues.name.trim(),
            minQuantity: initialValues.minQuantity,
            categoryId: initialValues.categoryId,
            supplierId: initialValues.supplierId,
            compatibleModelIds: initialValues.compatibleModelIds,
            manufacturerId: initialValues.manufacturerId,
        });
    }, [initialValues]);

    const updateField = <K extends keyof SparePartFormData>(
        key: K,
        value: SparePartFormData[K]
    ) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        setError(false);
    };

    const onClose = () => {
        setFormData(emptyForm);
        close();
    }

    const onSubmit = () => {
        submit(formData, {
            onError: () => setError(true),
            onSuccess: () => {
                setError(false);
                onClose();
            },
        })
    }

    const isValid =
        formData.name.trim().length > 0 &&
        formData.minQuantity > 0 &&
        formData.categoryId !== null &&
        formData.supplierId !== null &&
        formData.manufacturerId !== null;

    return (
        <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{initialValues ?
                        "" :
                        "Додати нову запчастину"
                    }</DialogTitle>
                    <DialogDescription>{initialValues ?
                        "" :
                        "Заповніть форму для додавання нової запчастини до каталогу"
                    }</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Назва *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={e => updateField("name", e.target.value)}
                            placeholder="Назва запчастини"
                            className="border border-slate-200 rounded-lg "
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="minQuantity">Мінімальна кількість *</Label>
                        <Input
                            id="minQuantity"
                            value={formData.minQuantity}
                            onChange={e => updateField("minQuantity", +e.target.value)}
                            type="number"
                            className="border border-slate-200 rounded-lg "
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Категорія *</Label>
                        <Select
                            value={formData.categoryId ?? ""}
                            onValueChange={value => updateField("categoryId", value)}
                        >
                            <SelectTrigger className="flex-1 w-full h-9 bg-white border border-slate-200 rounded-lg">
                                <SelectValue placeholder="Оберіть категорію" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    categories.map(category => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="supplier">Виробник *</Label>
                        <Select
                            value={formData.manufacturerId ?? ''}
                            onValueChange={value => updateField("manufacturerId", value)}
                        >
                            <SelectTrigger className="flex-1 w-full h-9 bg-white border border-slate-200 rounded-lg">
                                <SelectValue placeholder="Оберіть виробника" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    manufacturers.map(manufacturer => (
                                        <SelectItem key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="supplier">Постачальник *</Label>
                        <Select
                            value={formData.supplierId ?? ''}
                            onValueChange={value => updateField("supplierId", value)}
                        >
                            <SelectTrigger className="flex-1 w-full h-9 bg-white border border-slate-200 rounded-lg">
                                <SelectValue placeholder="Оберіть постачальника" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    suppliers.map(supplier => (
                                        <SelectItem key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="compatibleModels">Сумісні моделі</Label>
                        <MultiSelect
                            maxCount={1}
                            className="font-normal"
                            placeholder="Оберіть сумісні моделі"
                            defaultValue={formData.compatibleModelIds}
                            onValueChange={value => {updateField("compatibleModelIds", value)}}
                            options={models.map(model => ({ value: model.id, label: model.name }))}
                        />
                    </div>
                </div>
                {error &&
                    <Notification type="error" message={initialValues ? "Не вдалося оновити дані про запчастину" : "Не вдалось створити запчастину"} />
                }
                <DialogFooter className="flex flex-row items-start sm:justify-between">
                    <Button variant="outline" className="flex-1" onClick={onClose}>Скасувати</Button>
                    <Button
                        onClick={onSubmit}
                        disabled={!isValid}
                        className="flex-1 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                    >
                        {initialValues ?
                            <>
                                <SaveIcon className="h-4 w-4" />
                                Зберегти зміни
                            </> :
                            <>
                                <PlusIcon className="h-4 w-4" />
                                Додати запчастину
                            </>
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SparePartFormModal;
export type { SparePartFormData };