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
import {useSuppliers} from "@/presentation/hooks/entities/supplier.ts";
import {useManufacturers} from "@/presentation/hooks/entities/manufacturer.ts";
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


const errorMessages = {
    name: "Запчастина з такою назвою вже існує, оберіть іншу.",
    create: "Не вдалося створити запчастину. Спробуйте ще раз пізніше.",
    delete: "Не вдалося видалити запчастину. Спробуйте ще раз пізніше.",
    update: "Не вдалося оновити інформацію про запчастину. Спробуйте ще раз пізніше.",
    locations: "Не вдалося оновити інформацію про наявність на складах. Спробуйте ще раз."
}

interface Props {
    pagination: Pagination,
    onSearchChange: (search: Pagination) => void;
}
const SparePartsTab = ({ pagination, onSearchChange }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [localSpareParts, setLocalSpareParts] = useState<SparePart[]>([]);
    const [creatingError, setCreatingError] = useTimedError<string | null>(null, 5000);
    const [values, setValues] = useState<SearchParams>({
        institutionId: "all",
        sparePartCategoryId: "all",
        equipmentModelId: "all",
        status: "all",
        sortOrder: "asc",
        sortBy: "name",
        search: ""
    });

    const { data: sparePartCategoriesPagination } = useSparePartCategories({pagination: UnlimitedPagination, sorting: SortByNameAsc})
    const { data: equipmentModelsPagination } = useEquipmentModels({pagination: UnlimitedPagination, sorting: SortByNameAsc})
    const { data: manufacturersPagination } = useManufacturers({pagination: UnlimitedPagination, sorting: SortByNameAsc})
    const { data: institutionsPagination } = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc})
    const { data: suppliersPagination } = useSuppliers({pagination: UnlimitedPagination, sorting: SortByNameAsc})

    const updateSparePart = useUpdateSparePart();
    const createSparePart = useCreateSparePart();
    const deleteSparePart = useDeleteSparePart();

    const { data: summary, refetch: refetchSummary } = useSparePartsSummary();
    const { data: sparePartsPagination } = useSpareParts({
        pagination: pagination,
        filters: {
            status: values.status === "all" ? undefined : values.status,
            name: values.search.trim().length === 0 ? undefined : values.search.trim(),
            categoryId: values.sparePartCategoryId === "all" ? undefined : values.sparePartCategoryId,
            modelId: values.equipmentModelId === "all" ? undefined : values.equipmentModelId,
            institutionId: values.institutionId === "all" ? undefined : values.institutionId,
        },
        sorting: {
            sortBy: values.sortBy,
            sortOrder: values.sortOrder,
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
            suppliersPagination?.items ?? [],
            manufacturersPagination?.items ?? [],
            equipmentModelsPagination?.items ?? [],
        ),
    [sparePartCategoriesPagination, equipmentModelsPagination, suppliersPagination, manufacturersPagination])

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
                <DashboardCard label="Всього" value={summary?.total ?? 0} color="slate" icon={Package} />
                <DashboardCard label="У наявності" value={summary?.inStock ?? 0} color="green" icon={CheckCircle} />
                <DashboardCard label="Низький залишок" value={summary?.lowStock ?? 0} color="yellow" icon={AlertTriangle} />
                <DashboardCard label="Відсутні" value={summary?.outOfStock ?? 0} color="red" icon={XCircle} />
            </div>

            <FiltersPanel
                setValues={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
                actionButton={<AddButton onClick={() => setIsModalOpen(true)} title="Додати запчастину" />}
                searchPlaceholder={"Пошук за назвою або кодом запчастини"}
                filters={filterFields}
                values={values}
            />
            <SparePartsTable
                spareParts={localSpareParts}
                deleteSparePart={onDeleteSparePart}
                updateLocations={onUpdateLocations}
                updateSparePart={onUpdateSparePart}
                institutions={institutionsPagination?.items ?? []}
                suppliers={suppliersPagination?.items ?? []}
                models={equipmentModelsPagination?.items ?? []}
                categories={sparePartCategoriesPagination?.items ?? []}
                manufacturers={manufacturersPagination?.items ?? []}
            />

            <FormModal
                title="Додати запчастину"
                description="Внесіть інформацію про нову запчастину"
                submitText="Додати"
                submit={onCreateSparePart}
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                fields={modalFields}
                errors={creatingError ? [creatingError] : []}
                initialValues={{
                    name: "",
                    minQuantity: 1,
                    sparePartCategoryId: "",
                    supplierId: "",
                    manufacturerId: "",
                    compatibleModelIds: [],
                }}
            />

            <PaginationControl
                items={sparePartsPagination?.total ?? 0}
                pagination={pagination}
                onChange={onSearchChange}
            />
        </div>
    );
};

export default SparePartsTab;
export { errorMessages };