import {useEffect, useMemo, useState} from "react";
import {type Pagination, type PaginationResponse} from "@/domain/pagination.ts";
import {Button} from "@/presentation/components/ui/button.tsx";
import {type LucideIcon, Plus} from "lucide-react";
import FiltersPanel, {type FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import type {UseMutationResult, UseQueryResult} from "@tanstack/react-query";
import type {ListQuery} from "@/domain/list-query.ts";
import type {
    Entity,
    EntityCreate,
    EntityUpdate,
    UIEntity
} from "@/presentation/components/layouts/name-only-tab/models.ts";
import NameOnlyTable from "@/presentation/components/layouts/name-only-tab/NameOnlyTable.tsx";
import {useHandleMutation} from "@/presentation/hooks/useHandleMutation.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {composeMutationOptions} from "@/presentation/utils.ts";
import type {RequestError} from "@/infrastructure/errors.ts";

interface Config {
    list: (query: ListQuery<{ name?: string }, "name">) => UseQueryResult<PaginationResponse<Entity>>;
    create: () => UseMutationResult<Entity, RequestError, EntityCreate, unknown>;
    update: () => UseMutationResult<Entity, RequestError, EntityUpdate, unknown>;
    delete_: () => UseMutationResult<string, RequestError, string, unknown>;

    icon: LucideIcon;
}

interface Props {
    pagination: Pagination;
    onPaginationChange: (pagination: Pagination) => void;
    config: Config
}

const NameOnlyTab = ({ config, pagination, onPaginationChange }: Props) => {
    const [values, setValues] = useState<FiltersPanelValues>({ search: "", sortOrder: "asc" });
    const [localEntities, setLocalEntities] = useState<UIEntity[]>([]);

    const { data: entitiesPagination } = config.list({
        pagination,
        filters: {name: values.search.trim().length < 2 ? undefined : values.search.trim(),},
        sorting: { sortBy: "name", sortOrder: values.sortOrder }
    });

    const createEntity = config.create();
    const updateEntity = config.update();
    const deleteEntity = config.delete_();

    useEffect(() => {
        if (entitiesPagination === undefined) return;
        setLocalEntities(entitiesPagination.items.map(x => ({uiId: x.id, name: x.name})));
    }, [entitiesPagination]);

    const onAdd = () => {
        setLocalEntities(prev => {
            if (prev.some(x => x.isNew)) return prev;

            return [
                { uiId: crypto.randomUUID(), name: "", isNew: true },
                ...prev,
            ];
        });
    };

    const onCreate = useHandleMutation(createEntity,
        (data: Entity) =>
            setLocalEntities(prev =>
                prev.map(x =>
                    x.isNew
                        ? { uiId: data.id, name: data.name }
                        : x
                )
            ),
        (error?: RequestError) => console.log(error?.status, "fsdfdsfdfsd"),
    );

    const onUpdate = useHandleMutation(updateEntity, (data: Entity) =>
        setLocalEntities(prev => prev.map(x => x.uiId === data.id ? {uiId: data.id, name: data.name} : x))
    );

    const onDelete = (entity: UIEntity, options?: MutationOptions<string>) => {
        if (entity.isNew) {
            setLocalEntities(prev => prev.filter(x => x.uiId !== entity.uiId));
            options?.onSuccess?.(entity.uiId);
            return;
        }

        deleteEntity.mutate(entity.uiId, composeMutationOptions({
            onSuccess: (id) => setLocalEntities(prev => prev.filter(x => x.uiId !== id)),
            onError: (error) => console.log(error),
        }, options));
    }

    const onSave = (data: UIEntity, options?: MutationOptions<Entity>) => {
        if (data.isNew) {
            onCreate(data, options);
            return
        }

        onUpdate({id: data.uiId, name: data.name}, options);
    }

    const createButton = (
        <Button
            onClick={onAdd}
            className="px-4! h-12 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-2"
        >
            <Plus className="w-8 h-8" />
            Додати
        </Button>
    );

    return (
        <div className="space-y-6">
            <FiltersPanel
                values={values}
                actionButton={createButton}
                searchPlaceholder="Пошук за назвою"
                setValues={(key, value) => setValues(prev => ({ ...prev, [key]: value }))}
            />

            <NameOnlyTable
                save={onSave}
                delete_={onDelete}
                entities={localEntities}
                icon={config.icon}
            />

            <PaginationControl
                onChange={onPaginationChange}
                items={entitiesPagination?.total ?? 0}
                pagination={pagination}
            />
        </div>
    );
};

export default NameOnlyTab;