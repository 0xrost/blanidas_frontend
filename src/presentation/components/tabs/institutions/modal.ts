import {bindField, type FieldConfig} from "@/presentation/components/layouts/FormModal.tsx";

interface ModalFormData {
    name: string;
    address: string;
    contactPhone: string;
    contactEmail: string;
}

const modalFieldsFactory = (): FieldConfig<ModalFormData>[] => [
    {
        id: "name",
        label: "Назва",
        fullSizeOnMobile: true,
        placeholder: "Введіть назву",
        ...bindField("name"),
        required: true,
        colSpan: 4,
    },
    {
        id: "address",
        label: "Адреса",
        fullSizeOnMobile: true,
        placeholder: "Місто, вулиця, будинок",
        ...bindField("address"),
        required: true,
        colSpan: 4
    },
    {
        id: "phone",
        label: "Контактний номер телефону",
        placeholder: "+380XXXXXXXXX",
        fullSizeOnMobile: true,
        ...bindField("contactPhone"),
        required: true,
        validate: v => /^(?:\+38)?(?:\s*\d){10}$/.test(v),
        errorMessage: "Введіть правильний номер телефону у форматі +380XXXXXXXXX",
    },
    {
        id: "email",
        label: "Контактна пошта",
        fullSizeOnMobile: true,
        placeholder: "example@mail.com",
        ...bindField("contactEmail"),
        required: true,
        validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        errorMessage: "Введіть правильний email",
    },
];

export type { ModalFormData };
export { modalFieldsFactory };
