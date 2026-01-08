import {bindField, type FieldConfig} from "@/presentation/components/layouts/FormModal.tsx";
import type { Institution } from "@/domain/entities/institution.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";

interface ModalFormData {
    location: string;
    serialNumber: string;
    installed: Date;
    modelId: string;
    institutionId: string;
    categoryId: string;
    manufacturerId: string;
}

const modalFieldsFactory = (
    institutions: Institution[],
    models: EquipmentModel[],
    manufacturers: Manufacturer[],
    categories: EquipmentCategory[],
): FieldConfig<ModalFormData>[] => [
    {
        id: "model",
        label: "Модель",
        type: "select",
        colSpan: 4,
        placeholder: "Оберіть модель",
        ...bindField("modelId"),
        required: true,
        options: models.map(x => ({ value: x.id, label: x.name }))
    },
    {
        id: "institution",
        label: "Заклад",
        type: "select",
        colSpan: 4,
        placeholder: "Оберіть заклад",
        ...bindField("institutionId"),
        required: true,
        options: institutions.map(x => ({ value: x.id, label: x.name })),
    },
    {
        id: "location",
        label: "Розміщення",
        colSpan: 4,
        placeholder: "Введіть розміщення",
        ...bindField("location"),
        required: true,
    },
    {
        id: "serialNumber",
        label: "Серійний номер",
        placeholder: "Введіть серійний номер",
        ...bindField("serialNumber"),
        required: true,
    },
    {
        id: "installed",
        label: "Встановлено",
        type: "date",
        placeholder: "Введіть дату встановлення",
        ...bindField("installed"),
        required: true,
    },
    {
        id: "manufacturer",
        label: "Виробник",
        type: "select",
        placeholder: "Оберіть виробника",
        ...bindField("manufacturerId"),
        required: true,
        options: manufacturers.map(x => ({ value: x.id, label: x.name }))
    },
    {
        id: "category",
        label: "Категорія",
        type: "select",
        placeholder: "Оберіть категорію",
        ...bindField("categoryId"),
        required: true,
        options: categories.map(x => ({ value: x.id, label: x.name }))
    },
];

export { modalFieldsFactory };
export type { ModalFormData };
