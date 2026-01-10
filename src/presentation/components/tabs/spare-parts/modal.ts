import {bindField, type FieldConfig} from "@/presentation/components/layouts/FormModal.tsx";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";

interface ModalFormData {
    name: string;
    minQuantity: number;
    sparePartCategoryId: string;
    supplierId: string;
    compatibleModelIds: string[];
}

const modalFieldsFactory = (
    categories: SparePartCategory[],
    suppliers: Supplier[],
    models: EquipmentModel[],
): FieldConfig<ModalFormData>[] => [
    {
        id: "name",
        label: "Назва",
        colSpan: 4,
        fullSizeOnMobile: true,
        placeholder: "Введіть назву",
        ...bindField("name"),
        required: true,
    },
    {
        id: "minQuantity",
        label: "Мінімальна кільксть",
        type: "number",
        placeholder: "Вкажіть мінімальну кількість",
        ...bindField("minQuantity"),
        fullSizeOnMobile: true,
        required: true,
        validate: (value) => +value > 0,
        errorMessage: "Мінімальна кількість повинна бути більша за 0"
    },
    {
        id: "category",
        label: "Категорія",
        type: "select",
        fullSizeOnMobile: true,
        placeholder: "Оберіть категорію",
        ...bindField("sparePartCategoryId"),
        required: true,
        options: categories.map(x => ({ value: x.id, label: x.name }))
    },
    {
        id: "supplier",
        label: "Постачальник",
        type: "select",
        fullSizeOnMobile: true,
        colSpan: 4,
        placeholder: "Оберіть постачальника",
        ...bindField("supplierId"),
        required: true,
        options: suppliers.map(x => ({ value: x.id, label: x.name }))
    },
    {
        id: "models",
        label: "Сумісні моделі",
        type: "multiselect",
        colSpan: 4,
        fullSizeOnMobile: true,
        placeholder: "Оберіть сумісні моделі",
        options: models.map(type => ({ value: type.id, label: type.name })),
        ...bindField("compatibleModelIds"),
    },
];

export { modalFieldsFactory };
export type { ModalFormData };
