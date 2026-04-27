import {AlertTriangle, CheckCircle, Package, XCircle} from "lucide-react";
import {useSparePartsSummary} from "@/presentation/hooks/summary.ts";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import FiltersPanel, {type FilterConfig} from "@/presentation/components/layouts/FiltersPanel.tsx";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {useEffect, useMemo, useState} from "react";
import {
    useCreateSparePart,
    useDeleteSparePart,
    useSpareParts,
    useUpdateSparePart
} from "@/presentation/hooks/entities/spare-part.ts";
import SparePartsTable from "@/presentation/components/tabs/spare-parts/SparePartsTable.tsx";
import type {LocationCreate} from "@/domain/models/spare-part.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {useSparePartCategories} from "@/presentation/hooks/entities/spare-part-category.ts";
import {useEquipmentModels} from "@/presentation/hooks/entities/equipment-model.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {type Pagination, UnlimitedPagination} from "@/domain/pagination.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";
import {filterFieldsFactory, type SearchParams} from "@/presentation/components/tabs/spare-parts/filter.ts";
import {modalFieldsFactory} from "@/presentation/components/tabs/spare-parts/modal.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import {useHandleMutation} from "@/presentation/hooks/useHandleMutation.ts";
import AddButton from "@/presentation/components/layouts/AddButton.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import type {PaginationSearch} from "@/presentation/models.ts";
import {useOnSetValue} from "@/presentation/hooks/useOnSetValue.ts";
import {useOnPaginationChange} from "@/presentation/hooks/useOnPaginationChange.ts";

type Search = PaginationSearch & SearchParams;

const errorMessages = {
    name: "Запчастина з такою назвою вже існує, оберіть іншу.",
    create: "Не вдалося створити запчастину. Спробуйте ще раз пізніше.",
    delete: "Не вдалося видалити запчастину. Спробуйте ще раз пізніше.",
    update: "Не вдалося оновити інформацію про запчастину. Спробуйте ще раз пізніше.",
    locations: "Не вдалося оновити інформацію про наявність на складах. Спробуйте ще раз."
}

interface Props {
    pagination: Pagination,
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: SearchParams;
}
const SparePartsTab = ({ pagination, searchParams, onSearchChange }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [localSpareParts, setLocalSpareParts] = useState<SparePart[]>([]);
    const [creatingError, setCreatingError] = useTimedError<string | null>(null, 5000);

    const onSetValue = useOnSetValue(onSearchChange);
    const onPaginationChange = useOnPaginationChange(onSearchChange);

    const { data: sparePartCategoriesPagination } = useSparePartCategories({pagination: UnlimitedPagination, sorting: SortByNameAsc})
    const { data: equipmentModelsPagination } = useEquipmentModels({pagination: UnlimitedPagination, sorting: SortByNameAsc})
    const { data: institutionsPagination } = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc})

    const updateSparePart = useUpdateSparePart();
    const createSparePart = useCreateSparePart();
    const deleteSparePart = useDeleteSparePart();

    const { data: summary, refetch: refetchSummary } = useSparePartsSummary();
    const { data: sparePartsPagination } = useSpareParts({
        pagination: pagination,
        filters: {
            status: searchParams.status === "all" ? undefined : searchParams.status,
            name: searchParams.search.trim().length === 0 ? undefined : searchParams.search.trim(),
            categoryId: searchParams.sparePartCategoryId === "all" ? undefined : searchParams.sparePartCategoryId,
            modelId: searchParams.equipmentModelId === "all" ? undefined : searchParams.equipmentModelId,
            institutionId: searchParams.institutionId === "all" ? undefined : searchParams.institutionId,
        },
        sorting: {
            sortBy: searchParams.sortBy,
            sortOrder: searchParams.sortOrder,
        }
    })

    const filterFields = useMemo<FilterConfig[]>(() =>
        filterFieldsFactory(
            institutionsPagination?.items ?? [],
            sparePartCategoriesPagination?.items ?? [],
            equipmentModelsPagination?.items ?? [],
        ),
    [institutionsPagination, sparePartCategoriesPagination, equipmentModelsPagination]);

    const modalFields = useMemo(
        () => modalFieldsFactory(
            sparePartCategoriesPagination?.items ?? [],
            equipmentModelsPagination?.items ?? [],
        ),
    [sparePartCategoriesPagination, equipmentModelsPagination])

    useEffect(() => {
        if (sparePartsPagination) { setLocalSpareParts(sparePartsPagination.items); }
    }, [sparePartsPagination]);

    useEffect(() => { void refetchSummary() }, [localSpareParts, refetchSummary]);

    const onCreateSparePart = useHandleMutation(createSparePart,
        (data) => { setLocalSpareParts(prev => [data, ...prev.filter(x => x.id !== data.id)]); },
        (error) => {setCreatingError(
            error?.code == "value already exists" && error?.fields == "name"
                ? errorMessages.name
                : errorMessages.create
        )}
    )

    const onUpdateSparePart = useHandleMutation(updateSparePart,
        (data) => { setLocalSpareParts(prev =>  prev.map(part => { return part.id === data.id ? data : part; })); }
    )

    const onUpdateLocations = (sparePartId: string, locations: LocationCreate[], options?: MutationOptions<SparePart>) => {
        onUpdateSparePart({id: sparePartId, locations: locations,}, options);
    }

    const onDeleteSparePart = useHandleMutation(deleteSparePart, (id) => setLocalSpareParts(prev => prev.filter(x => x.id !== id), ));

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard
                    label="Всього"
                    value={summary?.total ?? 0}
                    color="slate"
                    icon={Package}
                    selected={searchParams.status === "all"}
                    onClick={() => onSearchChange((prev) => ({...prev, status: "all", page: "1"}))}
                />
                <DashboardCard
                    label="У наявності"
                    value={summary?.inStock ?? 0}
                    color="green"
                    icon={CheckCircle}
                    selected={searchParams.status === "in_stock"}
                    onClick={() => onSearchChange((prev) => ({...prev, status: "in_stock", page: "1"}))}
                />
                <DashboardCard
                    label="Низький залишок"
                    value={summary?.lowStock ?? 0}
                    color="yellow"
                    icon={AlertTriangle}
                    selected={searchParams.status === "low_stock"}
                    onClick={() => onSearchChange((prev) => ({...prev, status: "low_stock", page: "1"}))}
                />
                <DashboardCard
                    label="Відсутні"
                    value={summary?.outOfStock ?? 0}
                    color="red"
                    icon={XCircle}
                    selected={searchParams.status === "out_of_stock"}
                    onClick={() => onSearchChange((prev) => ({...prev, status: "out_of_stock", page: "1"}))}
                />
            </div>

            <FiltersPanel
                setValues={onSetValue}
                actionButton={<AddButton onClick={() => setIsModalOpen(true)} title="Додати запчастину" />}
                searchPlaceholder={"Пошук за назвою запчастини"}
                filters={filterFields}
                values={searchParams}
            />
            <SparePartsTable
                spareParts={localSpareParts}
                deleteSparePart={onDeleteSparePart}
                updateLocations={onUpdateLocations}
                updateSparePart={onUpdateSparePart}
                institutions={institutionsPagination?.items ?? []}
                models={equipmentModelsPagination?.items ?? []}
                categories={sparePartCategoriesPagination?.items ?? []}
            />

            <FormModal
                title="Додати запчастину"
                description="Внесіть інформацію про нову запчастину"
                submitText="Додати запчастину"
                submit={onCreateSparePart}
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                fields={modalFields}
                errors={creatingError ? [creatingError] : []}
                initialValues={{
                    name: "",
                    minQuantity: 1,
                    sparePartCategoryId: "",
                    compatibleModelIds: [],
                }}
            />

            <PaginationControl
                items={sparePartsPagination?.total ?? 0}
                pagination={pagination}
                onChange={onPaginationChange}
            />
        </div>
    );
};

export default SparePartsTab;
export { errorMessages };