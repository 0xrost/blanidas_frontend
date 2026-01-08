import {bindField, type FieldConfig} from "@/presentation/components/layouts/FormModal.tsx";
import type { Role } from "@/domain/auth/roles.ts";
import type { Institution } from "@/domain/entities/institution.ts";

interface MemberFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: Role;
    department: string;
    workplaceId: string;
    hireAt: Date;
    receiveLowStockNotification: boolean;
    receiveRepairRequestCreatedNotification: boolean;
}

const modalFieldsFactory = (institutions: Institution[], passwordRequired: boolean): FieldConfig<MemberFormData>[] => [
    {
        id: "firstName",
        label: "Ім'я",
        placeholder: "Введіть ім'я",
        ...bindField("firstName"),
        required: true,
    },
    {
        id: "lastName",
        label: "Прізвище",
        placeholder: "Введіть прізвище",
        ...bindField("lastName"),
        required: true,
    },
    {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "example@mail.com",
        ...bindField("email"),
        required: true,
        validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        errorMessage: "Введіть правильний email",
    },
    {
        id: "phone",
        label: "Номер телефону",
        type: "text",
        placeholder: "+380XXXXXXXXX",
        ...bindField("phone"),
        required: true,
        validate: v => /^(?:\+38)?(?:\s*\d){10}$/.test(v),
        errorMessage: "Введіть правильний номер телефону у форматі +380XXXXXXXXX",
    },
    {
        id: "password",
        label: "Пароль",
        type: "password",
        placeholder: "Мінімум 8 символів",
        ...bindField("password"),
        required: passwordRequired,
        validate: v => v.trim().length >= 8,
        errorMessage: "Пароль повинен містити мінімум 8 символів",
    },
    {
        id: "role",
        label: "Роль",
        type: "select",
        placeholder: "Оберіть роль",
        options: [
            { value: "engineer", label: "Інженер" },
            { value: "manager", label: "Менеджер" },
        ],
        ...bindField("role"),
        required: true,
    },
    {
        id: "department",
        label: "Відділ",
        placeholder: "Введіть назву відділу",
        ...bindField("department"),
        required: true,
    },
    {
        id: "hireAt",
        label: "Дата прийняття",
        type: "date",
        placeholder: "Оберіть дату прийняття",
        ...bindField("hireAt"),
        required: true,
    },
    {
        id: "workplaceId",
        label: "Місце роботи",
        type: "select",
        colSpan: 4,
        placeholder: "Оберіть місце роботи",
        options: institutions.map(inst => ({ value: inst.id, label: inst.name })),
        ...bindField("workplaceId"),
        required: true,
    },
    {
        id: "receiveLowStockNotification",
        label: "Отримувати сповіщення про низький рівень запасів запчастин",
        type: "checkbox",
        colSpan: 4,
        ...bindField("receiveLowStockNotification"),
    },
    {
        id: "receiveRepairRequestCreatedNotification",
        label: "Отримувати сповіщення про нові заявки на ремонт",
        type: "checkbox",
        colSpan: 4,
        ...bindField("receiveRepairRequestCreatedNotification"),
    },
];

export type { MemberFormData };
export { modalFieldsFactory };
