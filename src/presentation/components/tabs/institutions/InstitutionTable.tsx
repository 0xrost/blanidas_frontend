import type {Institution} from "@/domain/entities/institution.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {useCallback, useMemo, useState} from "react";
import {BadgeCheck, Building2, Mail, MapPin, Phone} from "lucide-react";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import {
    modalFieldsFactory,
    type ModalFormData
} from "@/presentation/components/tabs/institutions/modal.ts";
import type {InstitutionUpdate} from "@/domain/models/institution.ts";
import {errorMessages} from "@/presentation/components/tabs/institutions/InstitutionsTab.tsx";
import {composeMutationOptions} from "@/presentation/utils.ts";
import EmptyTable from "@/presentation/components/layouts/EmptyTable.tsx";
import {Badge} from "@/presentation/components/ui/badge.tsx";

interface Props {
    institutions: Institution[];
    update: (member: InstitutionUpdate, options?: MutationOptions) => void;
    delete_: (id: string, options: MutationOptions) => void;
}
const InstitutionTable = ({ institutions, update, delete_ }: Props) => {
    const [editingInstitution, setEditingInstitution] = useState<Institution | null>(null);
    const [failedDeletingInstitutionIds, setFailedDeletingMemberIds] = useTimedError<string[]>([], 5000);
    const [updatingError, setUpdatingError] = useTimedError<string | null>(null, 5000);

    const modalFields = useMemo(() => modalFieldsFactory(), []);

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

    const renderDefaultBadge = useCallback((institution: Institution) => {
        if (!institution.isDefault) return null;
        return (
            <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200">
                <BadgeCheck className="w-3 h-3 mr-1" />
                За замовчуванням
            </Badge>
        );
    }, []);

    return (
        <>
            <div className="md:hidden">
                {institutions.length === 0 ? (
                    <EmptyTable title="Заклади не знайдено" icon={Building2}/>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                        {institutions.map((institution) => (
                            <div key={institution.id} className="p-4">
                                <div className="mb-1">{renderDefaultBadge(institution)}</div>
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-1 min-w-0">
                                            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                                            <p className="text-sm font-medium text-slate-900">{institution.name}</p>
                                        </div>
                                        <div className="flex items-start gap-1 text-sm text-slate-700">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                            <span>{institution.address}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t-1 mt-2 pt-2  flex justify-between items-center">
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                            <a href={`mailto:${institution.contactEmail}`} className="truncate hover:text-cyan-600">
                                                {institution.contactEmail}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                                            <span>{institution.contactPhone}</span>
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        <EditDeleteActions
                                            edit={() => setEditingInstitution(institution)}
                                            delete_={() => onDelete(institution.id)}
                                        />
                                    </div>
                                </div>

                                {failedDeletingInstitutionIds.includes(institution.id) && (
                                    <p className="mt-3 text-xs text-red-700">{errorMessages.delete}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="hidden md:block">
                {institutions.length === 0 ? (
                    <EmptyTable title="Заклади не знайдено" icon={Building2}/>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-[minmax(0,2.2fr)_minmax(0,2fr)_auto] gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 uppercase tracking-wider">
                            <div>Заклад</div>
                            <div>Контакти</div>
                            <div className="text-right">Дії</div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {institutions.map((institution) => (
                                <div key={institution.id}>
                                    <div className="grid grid-cols-[minmax(0,2.2fr)_minmax(0,2fr)_auto] gap-4 px-4 py-3 items-center hover:bg-slate-50 transition-colors">
                                        <div className="flex flex-col items-start gap-2 min-w-0">
                                            <div className="mt-1 flex flex-col items-start">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                                                    <p className="text-sm font-medium text-slate-900 truncate">{institution.name}</p>
                                                </div>
                                                <div className="text-xs text-slate-500 truncate">{institution.address}</div>
                                            </div>
                                            {renderDefaultBadge(institution)}
                                        </div>
                                        <div className="space-y-1 min-w-0">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                                <a href={`mailto:${institution.contactEmail}`} className="truncate hover:text-cyan-600">
                                                    {institution.contactEmail}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                                                <span>{institution.contactPhone}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <EditDeleteActions
                                                edit={() => setEditingInstitution(institution)}
                                                delete_={() => onDelete(institution.id)}
                                            />
                                        </div>
                                    </div>
                                    {failedDeletingInstitutionIds.includes(institution.id) && (
                                        <div className="px-4 pb-3">
                                            <p className="text-xs text-red-700">{errorMessages.delete}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

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
                        contactPhone: editingInstitution.contactPhone,
                        contactEmail: editingInstitution.contactEmail,
                        is_default: editingInstitution.isDefault,
                    }}
                />
            )}
        </>
    );
}

export default InstitutionTable;