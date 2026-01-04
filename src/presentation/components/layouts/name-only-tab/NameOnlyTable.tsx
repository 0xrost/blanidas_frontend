import {useCallback, useEffect, useMemo, useState} from "react";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import Table, {type Column} from "@/presentation/components/layouts/Table.tsx";
import {Check, type LucideIcon, X} from "lucide-react";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import type {UIEntity} from "@/presentation/components/layouts/name-only-tab/models.ts";
import {Button} from "@/presentation/components/ui/button.tsx";


interface Props {
    save: (data: UIEntity, options?: MutationOptions) => void;
    delete_: (data: UIEntity, options?: MutationOptions) => void;
    entities: UIEntity[];

    icon: LucideIcon;
}

const NameOnlyTable = ({ save, delete_, entities, icon: Icon }: Props) => {
    const [editingEntity, setEditingEntity] = useState<UIEntity | null>(null);
    const [failedSaveId, setFailedSaveId] = useTimedError<string | null>(null, 5000);
    const [failedDeleteIds, setFailedDeleteIds] = useTimedError<Set<string>>(new Set(), 5000);

    useEffect(() => {
        const newEntity = entities.find(x => x.isNew && !editingEntity);
        if (newEntity) setEditingEntity(newEntity);
    }, [entities, editingEntity]);

    const rowError = useMemo(() => {
        const errors: Record<string, string> = {};

        failedDeleteIds.forEach(id => {
            errors[id] = "Не вдалося видалити. Спробуйте ще раз";
        });

        if (failedSaveId) {
            errors[failedSaveId] =
                editingEntity?.isNew
                    ? "Не вдалося створити. Спробуйте ще раз"
                    : "Не вдалося оновити. Спробуйте ще раз";
        }

        return errors;
    }, [failedDeleteIds, failedSaveId, editingEntity]);

    const onDelete = useCallback((data: UIEntity) => {
        delete_(data, {
            onSuccess: () => {
                setFailedDeleteIds(prev => {
                    const next = new Set(prev);
                    next.delete(data.uiId);
                    return next;
                });
            },
            onError: () => {
                setFailedDeleteIds(prev => new Set(prev).add(data.uiId));
            },
        });
    }, [delete_, setFailedDeleteIds]);

    const onSave = useCallback((entity: UIEntity) => {
        save(entity, {
            onSuccess: () => {
                setFailedSaveId(null);
                setEditingEntity(null);
            },
            onError: (x) => { setFailedSaveId(entity.uiId); console.log("sdfnj;ldfsjldfsjkdfskj", x) },
        });
    }, [save, setEditingEntity, setFailedSaveId]);

    const columns: Column<UIEntity>[] = useMemo(() => [
        {
            key: "name",
            header: "Назва",
            className: "py-3 px-4",
            cell: entity => (
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-400" />
                    {editingEntity?.uiId === entity.uiId ? (
                        <Input
                            autoFocus={true}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") onSave(editingEntity);
                                if (e.key === "Escape") setEditingEntity(null);
                            }}
                            onChange={(e) => {
                                setEditingEntity(prev => {
                                    if (prev === null) return prev;
                                    return {...prev, name: e.target.value}
                                });
                            }}
                            value={editingEntity.name}
                            className="text-base"
                        />
                    ) : (
                        <span className="text-slate-900 block">{entity.name}</span>
                    )}
                </div>
            ),
        },
        {
            key: "actions",
            header: "Дії",
            className: "py-3 px-4",
            cell: entity => (
                <div className="flex justify-end gap-2">
                    {editingEntity && editingEntity.uiId === entity.uiId ? (
                        <>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    if (editingEntity?.isNew) {
                                        onDelete(editingEntity);
                                    } else {
                                        setEditingEntity(null);
                                    }
                                }}
                                className="border-red-300 text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={editingEntity.name.trim().length === 0}
                                onClick={() => {onSave(editingEntity)}}
                                className="border-blue-300 text-blue-700 hover:bg-blue-50 h-8 w-8 p-0"
                            >
                                <Check className="w-4 h-4" />
                            </Button>
                        </>
                    ) : (
                        <EditDeleteActions
                            edit={() => setEditingEntity(entity)}
                            delete_={() => onDelete(entity)}
                        />
                    )}


                </div>
            ),
        },
    ], [editingEntity, Icon, onSave, onDelete, setEditingEntity]);

    return (
        <>
            <Table
                data={entities}
                columns={columns}
                rowKey={i => i.uiId}
                rowError={rowError}
            />
        </>
    );
};

export default NameOnlyTable;
