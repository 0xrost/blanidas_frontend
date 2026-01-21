import {useCallback, useMemo, useState} from "react";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {composeMutationOptions} from "@/presentation/utils.ts";
import Table, {type Column} from "@/presentation/components/layouts/Table.tsx";
import {Monitor, QrCode} from "lucide-react";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import type {Equipment} from "@/domain/entities/equipment.ts";
import type {EquipmentUpdate} from "@/domain/models/equipment.ts";
import StatusBadge from "@/presentation/components/tabs/equipment/StatusBadge.tsx";
import type {Institution} from "@/domain/entities/institution.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import {modalFieldsFactory, type ModalFormData} from "@/presentation/components/tabs/equipment/modal.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import {errorMessages} from "@/presentation/components/tabs/equipment/EquipmentTab.tsx";
import EmptyTable from "@/presentation/components/layouts/EmptyTable.tsx";


interface Props {
    equipment: Equipment[];
    institutions: Institution[];
    models: EquipmentModel[];
    manufacturers: Manufacturer[];
    categories: EquipmentCategory[]

    update: (member: EquipmentUpdate, options?: MutationOptions) => void;
    delete_: (id: string, options: MutationOptions) => void;
    showQr: (equipment: Equipment) => void;
}

const EquipmentTable = ({equipment, institutions, models, manufacturers, categories, update, delete_, showQr}: Props) => {
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
    const [failedDeletingEquipmentIds, setFailedDeletingEquipmentIds] = useTimedError<string[]>([], 5000);
    const [updatingError, setUpdatingError] = useTimedError<string | null>(null, 5000);

    const onUpdate = (data: ModalFormData, options?: MutationOptions) => {
        if (!editingEquipment) return;

        update({...data, id: editingEquipment.id }, composeMutationOptions({
            onSuccess: () => { setUpdatingError(null); },
            onError: (error) => setUpdatingError(
                error?.code == "value already exists" && error.fields == "serial_number"
                    ? errorMessages.serialNumber
                    : errorMessages.update
            )
        }, options));
    };

    const onDelete = useCallback((id: string) => {
        delete_(id, {
            onSuccess: () => setFailedDeletingEquipmentIds(prev => prev.filter(x => x !== id)),
            onError: () => setFailedDeletingEquipmentIds(prev => [...prev, id]),
        });
    }, [delete_, setFailedDeletingEquipmentIds]);

    const modalFields = useMemo(
        () => modalFieldsFactory(institutions, models, manufacturers, categories),
    [institutions, models, manufacturers, categories])

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
                        <span className="text-slate-500 text-nowrap">{item.manufacturer?.name}</span>
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
            cell: item => <StatusBadge status={item.status} />
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
                    <EditDeleteActions
                        edit={() => setEditingEquipment(item)}
                        delete_={() => onDelete(item.id)}
                    />
                </div>
            )
        }
    ], [onDelete, setEditingEquipment, showQr]);

    return (
        <>
            <Table
                data={equipment}
                columns={columns}
                rowKey={m => m.id}
                rowError={Object.fromEntries(failedDeletingEquipmentIds.map(x => [x, errorMessages.delete]))}
                empty={<EmptyTable title="Обладнання не знайдено" icon={Monitor}/>}
            />

            {editingEquipment && (
                <FormModal
                    isOpen
                    close={() => setEditingEquipment(null)}
                    title="Редагувати обладнання"
                    description="Внесіть зміни до інформації про обладнання"
                    fields={modalFields}
                    submit={onUpdate}
                    submitText="Зберегти зміни"
                    errors={updatingError ? [updatingError] : []}
                    initialValues={{
                        location: editingEquipment.location,
                        serialNumber: editingEquipment.serialNumber,
                        institutionId: editingEquipment.institution.id,
                        modelId: editingEquipment.model.id,
                        manufacturerId: editingEquipment.manufacturer?.id ?? "",
                        categoryId: editingEquipment.category?.id ?? "",
                        installed: editingEquipment.installed,
                    }}
                />
            )}
        </>
    );
};

export default EquipmentTable;