import {useCallback, useMemo, useState} from "react";
import { Edit, Mail, MapPin, Phone } from "lucide-react";

import type { User } from "@/domain/entities/user";
import type { UserUpdate } from "@/domain/models/user";
import type { Institution } from "@/domain/entities/institution";
import type { MutationOptions } from "@/presentation/models";

import RoleBadge from "@/presentation/components/tabs/staff/RoleBadge";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions";
import FormModal from "@/presentation/components/layouts/FormModal";
import { memberFields, type MemberFormData } from "@/presentation/components/tabs/staff/memberModal";
import { useTimedError } from "@/presentation/hooks/useTimedError";
import { Button } from "@/presentation/components/ui/button";
import Table, {type Column} from "@/presentation/components/layouts/Table.tsx";
import {composeMutationOptions} from "@/presentation/utils.ts";

interface Props {
    staff: User[];
    institutions: Institution[];
    update: (member: UserUpdate, options?: MutationOptions) => void;
    delete_?: (id: string, options: MutationOptions) => void;
}

const StaffTable = ({ staff, institutions, update, delete_ }: Props) => {
    const [editingMember, setEditingMember] = useState<User | null>(null);
    const [failedDeletingMemberIds, setFailedDeletingMemberIds] = useTimedError<string[]>([], 5000);
    const [updateError, setUpdateError] = useTimedError<string | null>(null, 5000);

    const onUpdate = (data: MemberFormData, options?: MutationOptions) => {
        if (!editingMember) return;

        update(
            {
                id: editingMember.id,
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
            composeMutationOptions({
                onSuccess: () => { setUpdateError(null); },
                onError: (error) => {
                    setUpdateError(error?.status === 400 ?
                        "Email уже використовується. Будь ласка, вкажіть інший." :
                        "Не вдалося оновити інформацію про працівника. Спробуйте ще раз пізніше."
                    )
                },
            }, options)
        );
    };

    const onDelete = useCallback((id: string) => {
        if (!delete_) return;
        delete_(id, {
            onSuccess: () => setFailedDeletingMemberIds(prev => prev.filter(x => x !== id)),
            onError: () => setFailedDeletingMemberIds(prev => [...prev, id]),
        });
    }, [delete_, setFailedDeletingMemberIds]);

    const columns: Column<User>[] = useMemo(() => [
        {
            key: "user",
            header: "Працівник",
            className: "px-6 py-4",
            cell: member => (
                <div>
                    <p className="text-slate-900">{member.username}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{member.workplace?.name ?? "-"}</span>
                    </div>
                </div>
            )
        },
        {
            key: "role",
            header: "Роль",
            className: "px-6 py-4",
            cell: member => <RoleBadge role={member.role} />
        },
        {
            key: "department",
            header: "Відділ",
            className: "px-6 py-4",
            cell: member => (
                <p className="text-sm text-slate-600">{member.department}</p>
            )
        },
        {
            key: "contacts",
            header: "Контакти",
            className: "px-6 py-4",
            cell: member => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <a
                            href={`mailto:${member.email}`}
                            className="hover:text-cyan-600"
                        >
                            {member.email}
                        </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{member.phoneNumber}</span>
                    </div>
                </div>
            )
        },
        {
            key: "hireAt",
            header: "Дата найму",
            className: "px-6 py-4",
            cell: member => (
                <p className="text-sm text-slate-600">
                    {new Date(member.hireAt).toLocaleDateString("uk-UA")}
                </p>
            )
        },
        {
            key: "actions",
            header: "Дії ",
            className: "px-6 py-4",
            cell: member =>
                delete_ ? (
                    <EditDeleteActions
                        edit={() => setEditingMember(member)}
                        delete_={() => onDelete(member.id)}
                    />
                ) : (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingMember(member)}
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 h-8 w-8 p-0"
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                )
        }
    ], [delete_, onDelete, setEditingMember]);

    return (
        <>
            <Table
                data={staff}
                columns={columns}
                rowKey={m => m.id}
                rowError={Object.fromEntries(failedDeletingMemberIds.map(x => [x, "Не вдалося видалити працівника"]))}
            />

            {editingMember && (
                <FormModal
                    isOpen
                    close={() => setEditingMember(null)}
                    title="Редагувати працівника"
                    description="Внесіть зміни до інформації про працівника"
                    fields={memberFields(institutions, false)}
                    submit={onUpdate}
                    submitText="Зберегти зміни"
                    errors={updateError ? [updateError] : []}
                    initialValues={{
                        firstName: editingMember.username.split(" ")[0],
                        lastName: editingMember.username.split(" ")[1] ?? "",
                        email: editingMember.email,
                        password: "",
                        phone: editingMember.phoneNumber,
                        hireAt: editingMember.hireAt,
                        department: editingMember.department,
                        workplaceId: editingMember.workplace?.id ?? "",
                        role: editingMember.role,
                        receiveLowStockNotification: editingMember.receiveLowStockNotification,
                        receiveRepairRequestCreatedNotification:
                        editingMember.receiveRepairRequestCreatedNotification,
                    }}
                />
            )}
        </>
    );
};

export default StaffTable;
