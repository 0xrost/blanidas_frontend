import { Edit, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/presentation/components/ui/button.tsx";
import type { User } from "@/domain/entities/user.ts";
import RoleBadge from "@/presentation/components/tabs/staff/RoleBadge.tsx";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import type { UserUpdate } from "@/domain/models/user.ts";
import type { MutationOptions } from "@/presentation/models.ts";
import { useTimedError } from "@/presentation/hooks/useTimedError.ts";
import Notification from "@/presentation/components/layouts/Notification.tsx";
import { memberFields, type MemberFormData } from "@/presentation/components/tabs/staff/memberModal.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import { useMemo, useState } from "react";
import type { Institution } from "@/domain/entities/institution.ts";

interface Props {
    member: User;
    institutions: Institution[];
    update: (member: UserUpdate, options?: MutationOptions) => void;
    delete_?: (id: string, options: MutationOptions) => void;
}

const StaffTableRow = ({ member, institutions, update, delete_ }: Props) => {
    const [error, setError] = useTimedError(false, 5000);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalFields = useMemo(() => memberFields(institutions, false), [institutions]);

    const [firstName, lastName] = member.username.split(" ");

    const onDelete = () => {
        if (!delete_) return;
        delete_(member.id, {
            onSuccess: () => setError(false),
            onError: () => setError(true),
        });
    };

    const onUpdate = (data: MemberFormData, options?: MutationOptions) => {
        update(
            {
                id: member.id,
                role: data.role,
                phone: data.phone,
                email: data.email,
                hireAt: data.hireAt,
                workplaceId: data.workplaceId,
                department: data.department,
                username: `${data.firstName} ${data.lastName}`,
                receiveLowStockNotification: data.receiveLowStockNotification,
                receiveRepairRequestCreatedNotification: data.receiveRepairRequestCreatedNotification,
                password: data.password.trim() || undefined,
            },
            options
        );
    };

    return (
        <>
            <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-slate-900">{member.username}</p>
                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                <MapPin className="w-3 h-3" />
                                <span>{member.workplace?.name ?? "-"}</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <RoleBadge role={member.role} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-slate-600">{member.department}</p>
                </td>
                <td className="px-6 py-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <a
                                href={`mailto:${member.email}`}
                                className="hover:text-cyan-600 transition-colors"
                            >
                                {member.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{member.phoneNumber}</span>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-slate-600">
                        {new Date(member.hireAt).toLocaleDateString("uk-UA")}
                    </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                    {delete_ ? (
                        <EditDeleteActions edit={() => setIsModalOpen(true)} remove={onDelete} />
                    ) : (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsModalOpen(true)}
                            className="border-blue-300 text-blue-700 hover:bg-blue-50 h-8 w-8 p-0"
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                    )}
                </td>
            </tr>

            {error && delete_ && (
                <tr className="bg-slate-50">
                    <td className="px-4 py-2" colSpan={6}>
                        <Notification
                            type="error"
                            message="Не вдалося видалити працівника. Спробуйте ще раз"
                        />
                    </td>
                </tr>
            )}

            <FormModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title="Редагувати працівника"
                description="Внесіть зміни до інформації про працівника"
                initialValues={{
                    firstName,
                    lastName,
                    email: member.email,
                    password: "",
                    phone: member.phoneNumber,
                    hireAt: member.hireAt,
                    department: member.department,
                    workplaceId: member.workplace?.id ?? "",
                    role: member.role,
                    receiveLowStockNotification: member.receiveLowStockNotification,
                    receiveRepairRequestCreatedNotification: member.receiveRepairRequestCreatedNotification,
                }}
                submit={onUpdate}
                fields={modalFields}
                errorText="Не вдалося оновити дані про працівника"
                submitText="Зберегти зміни"
            />
        </>
    );
};

export default StaffTableRow;
