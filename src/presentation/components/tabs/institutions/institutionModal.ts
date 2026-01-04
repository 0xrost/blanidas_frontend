import {bindField, type FieldConfig} from "@/presentation/components/layouts/FormModal.tsx";
import type {InstitutionType} from "@/domain/entities/institution-type.ts";

interface InstitutionFormData {
    name: string;
    address: string;
    typeId: string;
    contactPhone: string;
    contactEmail: string;
}

const institutionFields = (types: InstitutionType[]): FieldConfig<InstitutionFormData>[] => [
    {
        id: "name",
        label: "Назва",
        placeholder: "Введіть назву",
        ...bindField("name"),
        required: true,
    },
    {
        id: "address",
        label: "Адреса",
        placeholder: "Місто, вулиця, будинок",
        ...bindField("address"),
        required: true,
    },
    {
        id: "phone",
        label: "Контактний номер телефону",
        placeholder: "+380XXXXXXXXX",
        ...bindField("contactPhone"),
        required: true,
        validate: v => /^\+380\d{9}$/.test(v),
        errorMessage: "Введіть правильний номер телефону у форматі +380XXXXXXXXX",
    },
    {
        id: "email",
        label: "Контактна пошта",
        placeholder: "example@mail.com",
        ...bindField("contactEmail"),
        required: true,
        validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        errorMessage: "Введіть правильний email",
    },
    {
        id: "type",
        label: "Тип закладу",
        type: "select",
        colSpan: 4,
        placeholder: "Оберіть тип закладу",
        options: types.map(type => ({ value: type.id, label: type.name })),
        ...bindField("typeId"),
        required: true,
    },
];

export type { InstitutionFormData };
export { institutionFields };
