import type {Institution} from "@/domain/entities/institution.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {useCallback, useMemo, useState} from "react";
import Table, {type Column} from "@/presentation/components/layouts/Table.tsx";
import {Badge} from "@/presentation/components/ui/badge.tsx";
import {Building2, Mail, Phone} from "lucide-react";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import {
    modalFieldsFactory,
    type ModalFormData
} from "@/presentation/components/tabs/institutions/modal.ts";
import type {InstitutionType} from "@/domain/entities/institution-type.ts";
import type {InstitutionUpdate} from "@/domain/models/institution.ts";
import {errorMessages} from "@/presentation/components/tabs/institutions/InstitutionsTab.tsx";
import {composeMutationOptions} from "@/presentation/utils.ts";
import EmptyTable from "@/presentation/components/layouts/EmptyTable.tsx";

interface Props {
    institutions: Institution[];
    institutionTypes: InstitutionType[];
    update: (member: InstitutionUpdate, options?: MutationOptions) => void;
    delete_: (id: string, options: MutationOptions) => void;
}
const InstitutionTable = ({ institutions, institutionTypes, update, delete_ }: Props) => {
    const [editingInstitution, setEditingInstitution] = useState<Institution | null>(null);
    const [failedDeletingInstitutionIds, setFailedDeletingMemberIds] = useTimedError<string[]>([], 5000);
    const [updatingError, setUpdatingError] = useTimedError<string | null>(null, 5000);

    const modalFields = useMemo(() => modalFieldsFactory(institutionTypes), [institutionTypes]);

    const onUpdate = (data: ModalFormData, options?: MutationOptions) => {
        if (!editingInstitution) return;
        update({id: editingInstitution.id, ...data}, composeMutationOptions({
            onSuccess: () => { setUpdatingError(null); },
            onError: (error) => { setUpdatingError(
                error?.code == "value already exists" && error?.fields == "name"
                    ? errorMessages.name
                    : errorMessages.update
            )},
        }, options));
    };

    const onDelete = useCallback((id: string) => {
        delete_(id, {
            onSuccess: () => setFailedDeletingMemberIds(prev => prev.filter(x => x !== id)),
            onError: () => setFailedDeletingMemberIds(prev => [...prev, id]),
        });
    }, [delete_, setFailedDeletingMemberIds]);

    const columns: Column<Institution>[] = useMemo(() => [
        {
            key: "name",
            header: "Заклад",
            className: "py-3 px-4",
            cell: institution => (
                <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <div>
                        <span className="text-slate-900 text-nowrap block">{institution.name}</span>
                        <span className="text-xs text-nowrap text-slate-500">{institution.address}</span>
                    </div>
                </div>
            ),
        },
        {
            key: "type",
            header: "Тип",
            className: "py-3 px-4",
            cell: institution => (
                <>
                    {institution.type && (
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                            {institution.type.name ?? ""}
                        </Badge>
                    )}
                </>
            ),
        },
        {
            key: "contacts",
            header: "Контакти",
            className: "py-3 px-4",
            cell: institution => (
                <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                        <Mail className="w-3 h-3" />
                        {institution.contactEmail}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                        <Phone className="w-3 h-3" />
                        {institution.contactPhone}
                    </div>
                </div>
            ),
        },
        {
            key: "actions",
            header: "Дії",
            className: "py-3 px-4",
            cell: institution => (
                <div className="flex justify-end gap-2">
                    <EditDeleteActions
                        edit={() => setEditingInstitution(institution)}
                        delete_={() => onDelete(institution.id)}
                    />
                </div>
            ),
        },
    ], [onDelete, setEditingInstitution]);

    return (
        <>
            <Table
                data={institutions}
                columns={columns}
                rowKey={i => i.id}
                rowError={Object.fromEntries(failedDeletingInstitutionIds.map(x => [x, errorMessages.delete]))}
                empty={<EmptyTable title="Заклади не знайдено" icon={Building2}/>}
            />

            {editingInstitution && (
                <FormModal
                    isOpen
                    close={() => setEditingInstitution(null)}
                    title="Редагувати працівника"
                    description="Внесіть зміни до інформації про заклад"
                    fields={modalFields}
                    submit={onUpdate}
                    submitText="Зберегти зміни"
                    errors={updatingError ? [updatingError] : []}
                    initialValues={{
                        name: editingInstitution.name,
                        address: editingInstitution.address,
                        typeId: editingInstitution.type?.id ?? "",
                        contactPhone: editingInstitution.contactPhone,
                        contactEmail: editingInstitution.contactEmail,
                    }}
                />
            )}
        </>
    );
}

export default InstitutionTable;