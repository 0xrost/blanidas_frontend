import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/presentation/components/ui/dialog.tsx";
import { Button } from "@/presentation/components/ui/button.tsx";
import { Input } from "@/presentation/components/ui/input.tsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/presentation/components/ui/select.tsx";
import { MultiSelect } from "@/presentation/components/ui/multi-select.tsx";
import { useState } from "react";
import {Label} from "@/presentation/components/ui/label.tsx";
import Notification from "@/presentation/components/layouts/Notification.tsx";
import type {MutationOptions} from "@/presentation/models.ts";

const colSpanMap: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
};

const smColSpanMap: Record<number, string> = {
    1: "sm:col-span-1",
    2: "sm:col-span-2",
    3: "sm:col-span-3",
    4: "sm:col-span-4",
};

export type FieldType = "text"
    | "number"
    | "email"
    | "password"
    | "date"
    | "select"
    | "multiselect"
    | "checkbox"
    | "custom";

const bindField = <T, K extends keyof T>(key: K) => ({
    getValue: (data: T) => data[key],
    setValue: (data: T, value: T[K]) => ({ ...data, [key]: value }),
});

export interface FieldConfig<T> {
    id: string;
    label: string;
    type?: FieldType;
    fullSizeOnMobile?: boolean;
    options?: { value: string; label: string }[];
    maxCount?: number;
    getValue: (formData: T) => any;
    setValue: (formData: T, value: any) => T;
    placeholder?: string;
    required?: boolean;
    colSpan?: 1 | 2 | 3 | 4;
    validate?: (value: any, formData: T) => boolean;
    errorMessage?: string;
    renderCustom?: (value: any, onChange: (value: any) => void) => React.ReactNode;
}

interface Props<T> {
    isOpen: boolean;
    close: () => void;
    title: string;
    description?: string;
    initialValues: T;
    submit: (data: T, options?: MutationOptions) => void;
    fields: FieldConfig<T>[];
    errors?: string[];
    submitText?: string;
    cancelText?: string;
}

function FormModal<T>({
    isOpen,
    close,
    title,
    description,
    initialValues,
    submit,
    fields,
    errors,
    submitText = "Зберегти",
    cancelText = "Скасувати"
}: Props<T>) {
    const [formData, setFormData] = useState<T>(initialValues);

    const onSubmit = () => {
        submit(formData, { onSuccess: onClose })
    }

    const onClose = () => {
        setFormData(initialValues);
        close();
    }

    const updateField = (field: FieldConfig<T>, value: any) => {
        setFormData(prev => field.setValue(prev, value));
    };

    const validationErrors = fields.reduce<string[]>((x, field) => {
        const value = field.getValue(formData);
        if (!value) return x;

        if (field.validate && !field.validate(value, formData)) {
            x.push(field.errorMessage || "Невалідне значення")
        }

        return x;
    }, []);

    const isValid = fields.every(f => !f.required || f.getValue(formData)) && validationErrors.length === 0;

    return (
        <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                    <div className="grid grid-cols-4 gap-4 py-4">
                        {fields.map(field => {
                            const colSpan = colSpanMap[field.colSpan ?? 2];
                            const smColSpan = smColSpanMap[field.colSpan ?? 2];
                            return (
                                <div className={
                                    `space-y-2 ${field.fullSizeOnMobile ? "col-span-4" : colSpan} ${smColSpan}`
                                } key={field.id}>
                                    {field.type !== "checkbox" &&
                                        <Label htmlFor={field.id}>{field.label} {field.required ? " *" : ""}</Label>
                                    }

                                    {field.renderCustom ? (
                                        field.renderCustom(field.getValue(formData), (v) => updateField(field, v))
                                    ) : field.type === "select" ? (
                                        <Select
                                            value={field.getValue(formData) || ""}
                                            onValueChange={value => updateField(field, value)}
                                        >
                                            <SelectTrigger className="flex-1 w-full h-9 bg-white border border-slate-200 rounded-lg">
                                                <SelectValue placeholder={field.placeholder || "Оберіть..."} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options?.map(o => (
                                                    <SelectItem key={o.value} value={o.value}>
                                                        {o.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : field.type === "multiselect" ? (
                                        <MultiSelect
                                            maxCount={field.maxCount}
                                            className="font-normal"
                                            responsive={true}
                                            placeholder={field.placeholder || "Оберіть..."}
                                            defaultValue={field.getValue(formData) || []}
                                            onValueChange={value => updateField(field, value)}
                                            options={field.options || []}
                                        />
                                    ) : field.type === "checkbox" ? (
                                        <Label className="flex items-center gap-2 cursor-pointer">
                                            <Input
                                                type="checkbox"
                                                checked={Boolean(field.getValue(formData))}
                                                onChange={e => updateField(field, e.target.checked)}
                                                className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                                            />
                                            <span className="text-sm text-slate-700">{field.label}</span>
                                        </Label>
                                    ) : (
                                        <Input
                                            id={field.id}
                                            type={field.type || "text"}
                                            value={field.getValue(formData) || ""}
                                            onChange={e => updateField(field, e.target.value)}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                                        />
                                    )}

                                </div>
                            );
                        })}
                    </div>
                    {errors && errors.length !== 0 && errors.map(x => <Notification type="error" message={x} />)}
                    {validationErrors &&
                        validationErrors.map(x => {
                            return <Notification type="error" message={x} />;
                        })
                    }
                <DialogFooter className="flex flex-row items-start sm:justify-between gap-2">
                    <Button className="flex-1" variant="outline" onClick={onClose}>{cancelText}</Button>
                    <Button className="flex-1 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                            disabled={!isValid}
                            onClick={onSubmit}
                    >
                        {submitText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default FormModal;
export { bindField };