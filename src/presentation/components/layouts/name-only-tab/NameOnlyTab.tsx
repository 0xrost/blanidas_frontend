import {useEffect, useState} from "react";
import {type Pagination, type PaginationResponse} from "@/domain/pagination.ts";
import {type LucideIcon} from "lucide-react";
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
import { v4 as uuidv4 } from "uuid";
import type {RequestError} from "@/infrastructure/errors.ts";
import AddButton from "@/presentation/components/layouts/AddButton.tsx";
import type {Search} from "@/presentation/routes/_authenticated/manager/settings";
import {useOnPaginationChange} from "@/presentation/hooks/useOnPaginationChange.ts";
import {useOnSetValue} from "@/presentation/hooks/useOnSetValue.ts";

interface Config {
    list: (query: ListQuery<{ name?: string }, "name">) => UseQueryResult<PaginationResponse<Entity>>;
    create: () => UseMutationResult<Entity, RequestError, EntityCreate, unknown>;
    update: () => UseMutationResult<Entity, RequestError, EntityUpdate, unknown>;
    delete_: () => UseMutationResult<string, RequestError, string, unknown>;

    icon: LucideIcon;
}

interface Props {
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: FiltersPanelValues;
    config: Config
}

const errorMessages = {
    name: "Ця назва вже використовується, оберіть іншу.",
    create: "Не вдалося створити заклад. Спробуйте ще раз пізніше.",
    delete: "Не вдалося видалити заклад. Спробуйте ще раз пізніше.",
    update: "Не вдалося оновити інформацію про заклад. Спробуйте ще раз пізніше."
}

const NameOnlyTab = ({ config, pagination, onSearchChange, searchParams }: Props) => {
    const [localEntities, setLocalEntities] = useState<UIEntity[]>([]);

    const { data: entitiesPagination } = config.list({
        pagination,
        filters: {name: searchParams.search.trim().length < 2 ? undefined : searchParams.search.trim(),},
        sorting: { sortBy: "name", sortOrder: searchParams.sortOrder }
    });

    const onPaginationChange = useOnPaginationChange(onSearchChange);
    const onSetValue = useOnSetValue(onSearchChange);


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
                { uiId: uuidv4(), name: "", isNew: true },
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

    return (
        <div className="space-y-6">
            <FiltersPanel
                values={searchParams}
                actionButton={<AddButton onClick={onAdd} title="Додати" />}
                searchPlaceholder="Пошук за назвою"
                setValues={onSetValue}
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
export { errorMessages };