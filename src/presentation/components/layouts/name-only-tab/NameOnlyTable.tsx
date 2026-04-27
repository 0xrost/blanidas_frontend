import {useCallback, useEffect, useMemo, useState} from "react";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {Check, type LucideIcon, X} from "lucide-react";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import type {UIEntity} from "@/presentation/components/layouts/name-only-tab/models.ts";
import {Button} from "@/presentation/components/ui/button.tsx";
import {errorMessages} from "@/presentation/components/layouts/name-only-tab/NameOnlyTab.tsx";
import EmptyTable from "@/presentation/components/layouts/EmptyTable.tsx";


interface Props {
    save: (data: UIEntity, options?: MutationOptions) => void;
    delete_: (data: UIEntity, options?: MutationOptions) => void;
    entities: UIEntity[];
    icon: LucideIcon;
}

const NameOnlyTable = ({ save, delete_, entities, icon: Icon }: Props) => {
    const [editingEntity, setEditingEntity] = useState<UIEntity | null>(null);
    const [failedSaveMessages, setFailedSaveMessages] = useTimedError<Record<string, string> | null>(null, 5000);
    const [failedDeleteIds, setFailedDeleteIds] = useTimedError<string[]>([], 5000);

    useEffect(() => {
        const newEntity = entities.find(x => x.isNew && !editingEntity);
        if (newEntity) setEditingEntity(newEntity);
    }, [entities, editingEntity]);

    const rowError = useMemo(() => {
        const errors: Record<string, string> = failedSaveMessages ?? {};
        failedDeleteIds.forEach(id => { errors[id] = errorMessages.delete; });

        return errors;
    }, [failedDeleteIds, failedSaveMessages]);

    const onDelete = useCallback((data: UIEntity) => {
        delete_(data, {
            onSuccess: () => {
                setFailedDeleteIds(prev => prev.filter(x => x != data.uiId));
                setEditingEntity(null);
            },
            onError: () => { setFailedDeleteIds(prev => [data.uiId, ...prev]); },
        });
    }, [delete_, setFailedDeleteIds]);

    const onSave = useCallback((entity: UIEntity) => {
        save(entity, {
            onSuccess: () => {
                setFailedSaveMessages(null);
                setEditingEntity(null);
            },
            onError: (error) => {
                let message = entity.isNew ? errorMessages.create : errorMessages.update;
                if (error?.code == "value already exists" && error?.fields == "name") { message = errorMessages.name; }
                setFailedSaveMessages(prev => ({[entity.uiId]: message, ...prev}));
            },
        });
    }, [save, setEditingEntity, setFailedSaveMessages]);

    const onConfirm = useCallback(() => {
        if (editingEntity && editingEntity.name.trim().length > 0) {
            onSave(editingEntity);
        }
    }, [editingEntity, onSave]);

    const onCancel = useCallback(() => {
        if (editingEntity?.isNew) {
            onDelete(editingEntity);
        } else {
            setEditingEntity(null);
        }
    }, [editingEntity, onDelete, setEditingEntity])

    const renderActions = useCallback((entity: UIEntity) => {
        if (editingEntity && editingEntity.uiId === entity.uiId) {
            return (
                <>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onCancel}
                        className="border-red-300 text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={editingEntity.name.trim().length === 0}
                        onClick={onConfirm}
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 h-8 w-8 p-0"
                    >
                        <Check className="w-4 h-4" />
                    </Button>
                </>
            );
        }

        return (
            <EditDeleteActions
                edit={() => setEditingEntity(entity)}
                delete_={() => onDelete(entity)}
            />
        );
    }, [editingEntity, onCancel, onConfirm, onDelete]);

    return (
        <>
            <div className="md:hidden">
                {entities.length === 0 ? (
                    <EmptyTable title="Нічого не знайдено" />
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                        {entities.map((entity) => (
                            <div key={entity.uiId} className="p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                        <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                                        {editingEntity?.uiId === entity.uiId ? (
                                            <Input
                                                autoFocus={true}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") onConfirm();
                                                    if (e.key === "Escape") onCancel();
                                                }}
                                                onChange={(e) => {
                                                    setEditingEntity(prev => {
                                                        if (prev === null) return prev;
                                                        return {...prev, name: e.target.value};
                                                    });
                                                }}
                                                value={editingEntity.name}
                                                className="text-base"
                                            />
                                        ) : (
                                            <p className="text-sm font-medium text-slate-900">{entity.name}</p>
                                        )}
                                    </div>
                                    <div className="shrink-0 flex gap-2">
                                        {renderActions(entity)}
                                    </div>
                                </div>
                                {rowError[entity.uiId] && (
                                    <p className="mt-3 text-xs text-red-700">{rowError[entity.uiId]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="hidden md:block">
                {entities.length === 0 ? (
                    <EmptyTable title="Нічого не знайдено" />
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 uppercase tracking-wider">
                            <div>Назва</div>
                            <div className="text-right">Дії</div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {entities.map((entity) => (
                                <div key={entity.uiId}>
                                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-4 py-3 items-center hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                                            {editingEntity?.uiId === entity.uiId ? (
                                                <Input
                                                    autoFocus={true}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") onConfirm();
                                                        if (e.key === "Escape") onCancel();
                                                    }}
                                                    onChange={(e) => {
                                                        setEditingEntity(prev => {
                                                            if (prev === null) return prev;
                                                            return {...prev, name: e.target.value};
                                                        });
                                                    }}
                                                    value={editingEntity.name}
                                                    className="text-base"
                                                />
                                            ) : (
                                                <p className="text-sm font-medium text-slate-900 truncate">{entity.name}</p>
                                            )}
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            {renderActions(entity)}
                                        </div>
                                    </div>
                                    {rowError[entity.uiId] && (
                                        <div className="px-4 pb-3">
                                            <p className="text-xs text-red-700">{rowError[entity.uiId]}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default NameOnlyTable;
