import {AlertTriangle, CheckCircle, Package, Plus, XCircle} from "lucide-react";
import {useSparePartsSummary} from "@/presentation/hooks/summary.ts";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import FilterCard, {type FilterCardValues, type FilterConfig} from "@/presentation/components/layouts/FilterCard.tsx";
import type {SparePart, SparePartStatus} from "@/domain/entities/spare-part.ts";
import {useEffect, useMemo, useState} from "react";
import type {SparePartsSortBy} from "@/domain/query/spare-part.query.ts";
import {
    useCreateSparePart,
    useDeleteSparePart,
    useSpareParts,
    useUpdateSparePart
} from "@/presentation/hooks/spare-part.ts";
import SparePartsList from "@/presentation/components/tabs/spare-parts/SparePartsList.tsx";
import type {LocationCreate, SparePartUpdate} from "@/domain/models/spare-parts.ts";
import {useInstitutions} from "@/presentation/hooks/institution.ts";
import {type Pagination, UnlimitedPagination} from "@/domain/models/pagination.ts";
import SparePartFormModal, {
    type SparePartFormData
} from "@/presentation/components/tabs/spare-parts/SparePartFormModal.tsx";
import {useSparePartCategories} from "@/presentation/hooks/spare-part-categories.ts";
import {useEquipmentModels} from "@/presentation/hooks/equipment-models.ts";
import {useSuppliers} from "@/presentation/hooks/suppliers.ts";
import {useManufacturers} from "@/presentation/hooks/manufacturers.ts";
import {Button} from "@/presentation/components/ui/button.tsx";
import {composeMutationOptions} from "@/presentation/utils.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {Route} from "@/presentation/routes/manager/dashboard/repair-requests";

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

interface SearchParams extends FilterCardValues {
    institutionId: string;
    sparePartCategoryId: string;
    sparePartModelId: string;
    status: SparePartStatus | "all";
    sortBy: SparePartsSortBy;
}

interface Props { page: number, limit: number }
const SparePartsListTab = ({ page, limit }: Props) => {
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

    const { data: institutionsPagination } = useInstitutions(UnlimitedPagination)
    const { data: sparePartCategoriesPagination } = useSparePartCategories(UnlimitedPagination, { sortBy: 'name', sortOrder: 'asc' })
    const { data: equipmentModelsPagination } = useEquipmentModels(UnlimitedPagination, { sortBy: 'name', sortOrder: 'asc' })
    const { data: suppliersPagination } = useSuppliers(UnlimitedPagination, { sortBy: 'name', sortOrder: 'asc' })
    const { data: manufacturersPagination } = useManufacturers(UnlimitedPagination, {}, { sortBy: 'name', sortOrder: 'asc' })

    const updateSparePart = useUpdateSparePart();
    const createSparePart = useCreateSparePart();
    const deleteSparePart = useDeleteSparePart();

    const pagination = useMemo<Pagination>(() => ({ page: page, limit: limit }), [page, limit])

    const { data: summary, refetch: refetchSummary } = useSparePartsSummary();
    const { data: sparePartsPagination } = useSpareParts(
        pagination,
        {
            status: values.status === "all" ? undefined : values.status,
            name: values.search.trim().length === 0 ? undefined : values.search.trim(),
            categoryId: values.sparePartCategoryId === "all" ? undefined : values.sparePartCategoryId,
            modelId: values.sparePartModelId === "all" ? undefined : values.sparePartModelId,
            institutionId: values.institutionId === "all" ? undefined : values.institutionId,
        },
        {
            sortBy: values.sortBy,
            sortOrder: values.sortOrder,
        },
    )

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

    useEffect(() => { refetchSummary() }, [spareParts]);

    const onCreateSparePart = (data: SparePartFormData, options?: MutationOptions<SparePart>) => {
        if (data.categoryId === null || data.supplierId === null || data.manufacturerId === null) return;
        createSparePart.mutate({...data, sparePartCategoryId: data.categoryId}, composeMutationOptions({
            onSuccess: (response) => {
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

    const onDeleteSparePart = (id: string, options?: MutationOptions<null>) => {
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

            <FilterCard
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
                institutions={institutionsPagination?.items ?? []}
                suppliers={suppliersPagination?.items ?? []}
                models={equipmentModelsPagination?.items ?? []}
                categories={sparePartCategoriesPagination?.items ?? []}
                manufacturers={manufacturersPagination?.items ?? []}
            />
            <PaginationControl
                items={sparePartsPagination?.total ?? 0}
                pagination={pagination}
            />
        </div>
    );
};

export default SparePartsListTab;