import {AlertTriangle, CheckCircle, Package, Plus, XCircle} from "lucide-react";
import {useSparePartsSummary} from "@/presentation/hooks/summary.ts";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import FiltersPanel, {type FiltersPanelValues, type FilterConfig} from "@/presentation/components/layouts/FiltersPanel.tsx";
import type {SparePart, StockStatus} from "@/domain/entities/spare-part.ts";
import {useEffect, useMemo, useState} from "react";
import type {SparePartSortBy} from "@/domain/queries/spare-part-list.query.ts";
import {
    useCreateSparePart,
    useDeleteSparePart,
    useSpareParts,
    useUpdateSparePart
} from "@/presentation/hooks/entities/spare-part.ts";
import SparePartsList from "@/presentation/components/tabs/spare-parts/SparePartsList.tsx";
import type {LocationCreate, SparePartUpdate} from "@/domain/models/spare-part.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import SparePartFormModal, {
    type SparePartFormData
} from "@/presentation/components/tabs/spare-parts/SparePartFormModal.tsx";
import {useSparePartCategories} from "@/presentation/hooks/entities/spare-part-category.ts";
import {useEquipmentModels} from "@/presentation/hooks/entities/equipment-model.ts";
import {useSuppliers} from "@/presentation/hooks/entities/supplier.ts";
import {useManufacturers} from "@/presentation/hooks/entities/manufacturer.ts";
import {Button} from "@/presentation/components/ui/button.tsx";
import {composeMutationOptions} from "@/presentation/utils.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {type Pagination, UnlimitedPagination} from "@/domain/pagination.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";

const initialFilters: FilterConfig[] = [
    {
        key: 'institutionId',
        options: [
            { value: 'all', label: 'Всі центри' },
        ],
    },
    {
        key: 'sparePartCategoryId',
        options: [
            { value: 'all', label: 'Всі категорії' },
        ],
    },
    {
        key: 'sparePartModelId',
        options: [
            { value: 'all', label: 'Всі моделі' },
        ],
    },
    {
        key: 'status',
        options: [
            { value: 'all', label: 'Всі статуси' },
            { value: 'in_stock', label: 'У наявності' },
            { value: 'low_stock', label: 'Низький залишок' },
            { value: 'out_of_stock', label: 'Відсутня' },
        ],
    },
    {
        key: 'sortBy',
        options: [
            { value: 'name', label: 'За назвою' },
            { value: 'quantity', label: 'За кількістю' },
            { value: 'status', label: 'За статусом' },
        ],
    },
];

interface SearchParams extends FiltersPanelValues {
    institutionId: string;
    sparePartCategoryId: string;
    sparePartModelId: string;
    status: StockStatus | "all";
    sortBy: SparePartSortBy;
}

interface Props { page: number, limit: number, url: string }
const SparePartsListTab = ({ page, limit, url }: Props) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [spareParts, setSpareParts] = useState<SparePart[]>([]);
    const [values, setValues] = useState<SearchParams>({
        institutionId: "all",
        sparePartCategoryId: "all",
        sparePartModelId: "all",
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

    const pagination = useMemo<Pagination>(() => ({ page: page, limit: limit }), [page, limit])

    const { data: summary, refetch: refetchSummary } = useSparePartsSummary();
    const { data: sparePartsPagination } = useSpareParts({
        pagination: pagination,
        filters: {
            status: values.status === "all" ? undefined : values.status,
            name: values.search.trim().length === 0 ? undefined : values.search.trim(),
            categoryId: values.sparePartCategoryId === "all" ? undefined : values.sparePartCategoryId,
            modelId: values.sparePartModelId === "all" ? undefined : values.sparePartModelId,
            institutionId: values.institutionId === "all" ? undefined : values.institutionId,
        },
        sorting: {
            sortBy: values.sortBy,
            sortOrder: values.sortOrder,
        }
    })

    const filters = useMemo<FilterConfig[]>(() => {
        const mapper: Record<string, { id: string, name: string }[]> = {
            "institutionId": institutionsPagination?.items ?? [],
            "sparePartCategoryId": sparePartCategoriesPagination?.items ?? [],
            "sparePartModelId": equipmentModelsPagination?.items ?? [],
        };

        return initialFilters.map(filter => {
            if (filter.key in mapper) {
                return {
                    ...filter,
                    options: [
                        ...filter.options,
                        ...mapper[filter.key].map(item => ({
                            value: item.id.toString(),
                            label: item.name,
                        })),
                    ],
                };
            }

            return filter;
        });
    }, [institutionsPagination, sparePartCategoriesPagination, equipmentModelsPagination]);

    useEffect(() => {
        if (sparePartsPagination) {
            setSpareParts(sparePartsPagination.items);
        }
    }, [sparePartsPagination]);

    useEffect(() => { void refetchSummary() }, [spareParts, refetchSummary]);

    const onCreateSparePart = (data: SparePartFormData, options?: MutationOptions<SparePart>) => {
        if (data.categoryId === null || data.supplierId === null || data.manufacturerId === null) return;
        const { categoryId, supplierId, manufacturerId, ...rest } = data;
        createSparePart.mutate({
            ...rest,
            sparePartCategoryId: categoryId,
            manufacturerId: manufacturerId,
            supplierId: supplierId,
        }, composeMutationOptions({
            onSuccess: (response) => {
                console.log(response);
                setSpareParts(prev =>  [
                    response,
                    ...prev.filter(x => x.id !== response.id),
                ]);
            },
        }, options));
    };

    const onUpdateSparePart = (data: SparePartUpdate, options?: MutationOptions<SparePart>) => {
        updateSparePart.mutate(data, composeMutationOptions({
            onSuccess: (response) => {
                setSpareParts(prev =>  prev.map(part => {
                    if (part.id === response.id) return response;
                    return part;
                }));
            },
        }, options))
    }

    const onUpdateLocations = (sparePartId: string, locations: LocationCreate[], options?: MutationOptions<SparePart>) => {
        onUpdateSparePart({id: sparePartId, locations: locations,}, options);
    }

    const onDeleteSparePart = (id: string, options?: MutationOptions<void>) => {
        deleteSparePart.mutate(id, composeMutationOptions({
            onSuccess: () => setSpareParts(prev => prev.filter(x => x.id !== id),)
        }, options))
    }

    const createButton = (
        <Button
            onClick={() => setIsModalVisible(true)}
            className="h-12 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200">
            <Plus className="w-8 h-8" />
            Додати запчастину
        </Button>
    );

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
                values={values}
                actionButton={createButton}
                filters={filters}
                searchPlaceholder={"Пошук за назвою або кодом запчастини"}
            />
            <SparePartsList
                spareParts={spareParts}
                deleteSparePart={onDeleteSparePart}
                updateLocations={onUpdateLocations}
                updateSparePart={onUpdateSparePart}
                institutions={institutionsPagination?.items ?? []}
                suppliers={suppliersPagination?.items ?? []}
                models={equipmentModelsPagination?.items ?? []}
                categories={sparePartCategoriesPagination?.items ?? []}
                manufacturers={manufacturersPagination?.items ?? []}
            />
            <SparePartFormModal
                submit={onCreateSparePart}
                isOpen={isModalVisible}
                close={() => setIsModalVisible(false)}
                suppliers={suppliersPagination?.items ?? []}
                models={equipmentModelsPagination?.items ?? []}
                categories={sparePartCategoriesPagination?.items ?? []}
                manufacturers={manufacturersPagination?.items ?? []}
            />
            <PaginationControl
                items={sparePartsPagination?.total ?? 0}
                pagination={pagination}
                url={url}
            />
        </div>
    );
};

export default SparePartsListTab;