import {useCallback, useMemo, useState} from "react";
import type {User} from "@/domain/entities/user.ts";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import {memberFields, type MemberFormData} from "@/presentation/components/tabs/staff/memberModal.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {composeMutationOptions} from "@/presentation/utils.ts";
import Table, {type Column} from "@/presentation/components/layouts/Table.tsx";
import {Edit, Mail, MapPin, Monitor, Phone, QrCode, X} from "lucide-react";
import RoleBadge from "@/presentation/components/tabs/staff/RoleBadge.tsx";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import type {Equipment} from "@/domain/entities/equipment.ts";
import type {EquipmentUpdate} from "@/domain/models/equipment.ts";
import StatusBadge from "@/presentation/components/tabs/equipment/StatusBadge.tsx";


interface Props {
    equipment: Equipment[];
    update: (member: EquipmentUpdate, options?: MutationOptions) => void;
    delete_?: (id: string, options: MutationOptions) => void;
    showQr: (equipment: Equipment) => void;
}

const EquipmentTable = ({equipment, update, delete_, showQr}: Props) => {
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

    const columns: Column<Equipment>[] = useMemo(() => [
        {
            key: "equipment",
            header: "Обладнання",
            className: "py-3 px-4",
            cell: item => (
                <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-slate-400" />
                    <div className="text-sm">
                        <span className="text-slate-900 block text-nowrap">{item.model.name}</span>
                        <span className="text-slate-500">{item.manufacturer.name}</span>
                    </div>
                </div>
            )
        },
        {
            key: "serialNumber",
            header: "Серійник номер",
            className: "py-3 px-4 text-slate-900 text-sm text-nowrap",
            cell: item => item.serialNumber,
        },
        {
            key: "institution",
            header: "Заклад",
            className: "py-3 px-4 text-slate-900 text-sm text-nowrap",
            cell: item => item.institution.name,
        },
        {
            key: "location",
            header: "Розташування",
            className: "py-3 px-4 text-sm text-nowrap",
            cell: item => item.location,
        },
        {
            key: "status",
            header: "Статус",
            className: "py-3 px-4 text-sm",
            cell: item => <StatusBadge status={"under_maintenance"} />
        },
        {
            key: "actions",
            header: "Дії ",
            className: "py-3 px-4 text-sm",
            cell: item => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => showQr(item)}
                        className="border-slate-300 text-slate-700 hover:bg-slate-50 h-8 w-8 p-0"
                    >
                        <QrCode />
                    </Button>
                    <EditDeleteActions />
                </div>
            )
        }
    ], [delete_, onDelete, setEditingMember]);

    return (
        <>
            <Table
                data={equipment}
                columns={columns}
                rowKey={m => m.id}
                rowError={Object.fromEntries(failedDeletingMemberIds.map(x => [x, "Не вдалося видалити працівника"]))}
            />

        </>
    );
};

export default EquipmentTable;