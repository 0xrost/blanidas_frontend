import {AlertCircle, CheckCircle2, Clock, Package} from "lucide-react";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import FiltersPanel, {type FilterConfig} from "@/presentation/components/layouts/FiltersPanel.tsx";
import {useMemo, useState} from "react";
import {useRepairRequestsSummary} from "@/presentation/hooks/summary.ts";
import {useEquipmentCategories} from "@/presentation/hooks/entities/equipment-category.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {useRepairRequests} from "@/presentation/hooks/entities/repair-request.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {SortByNameAsc} from "@/domain/sorting.ts";
import {type Pagination, UnlimitedPagination} from "@/domain/pagination.ts";
import RepairRequestsTable from "@/presentation/components/tabs/repair-requests/RepairRequestsTable.tsx";
import {filtersFactory, type SearchParams} from "@/presentation/components/tabs/repair-requests/filters.ts";


interface Props {
    pagination: Pagination
    onPaginationChange: (pagination: Pagination) => void;
    onGoToDetails: (id: string) => void;
}

const RepairRequestListTab = ({pagination, onPaginationChange, onGoToDetails}: Props) => {
    const [values, setValues] = useState<SearchParams>({
        sortOrder: "desc",
        search: "",
        institutionId: 'all',
        categoryId: 'all',
        status: 'all',
        sortBy: 'date',
        urgency: 'all'
    });

    const onSetValue = (key: string, value: string) => {
        setValues((prev) => ({ ...prev, [key]: value }))
        if (key !== "sortBy" && key !== "sortOrder") {
            onPaginationChange({ ...pagination, page: 1 })
        }
    }

    const { data: summary } = useRepairRequestsSummary();
    const { data: equipmentCategoriesPagination } = useEquipmentCategories({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const { data: institutionsPagination } = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const { data: repairRequestsPagination } = useRepairRequests({
        pagination,
        filters: {
            urgency: values.urgency === "all" ? undefined : values.urgency,
            status: values.status === "all" ? undefined : values.status,
            equipmentCategoryId: values.categoryId === "all" ? undefined : values.categoryId,
            institutionId: values.institutionId === "all" ? undefined : values.institutionId,
            serialNumberOrEquipmentName: values.search.trim().length < 2 ? undefined : values.search.trim(),
        },
        sorting: { sortBy: values.sortBy, sortOrder: values.sortOrder }
    });


    const filters = useMemo<FilterConfig[]>(() => {
        return filtersFactory(institutionsPagination?.items ?? [], equipmentCategoriesPagination?.items ?? [])
    }, [equipmentCategoriesPagination, institutionsPagination]);

    return (
        <div className="w-full">
            <div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <DashboardCard label={"Нові"} value={summary?.new ?? 0} color="red" icon={AlertCircle} />
                    <DashboardCard label={"У роботі"} value={summary?.inProgress ?? 0} color="orange" icon={Clock} />
                    <DashboardCard label={"Очікує запчастини"} value={summary?.waitingSpareParts ?? 0} color="yellow" icon={Package} />
                    <DashboardCard label={"Виконано"} value={summary?.finished ?? 0} color="green" icon={CheckCircle2} />
                </div>
                <FiltersPanel
                    filters={filters}
                    values={values}
                    searchPlaceholder="Пошук за моделлю або серійним номером"
                    setValues={onSetValue}
                />
                <RepairRequestsTable
                    repairRequests={repairRequestsPagination?.items ?? []}
                    onGoToDetails={onGoToDetails}
                />

                <PaginationControl
                    onChange={onPaginationChange}
                    pagination={pagination}
                    items={repairRequestsPagination?.total ?? 0}
                />
            </div>
        </div>
    );
};

export default RepairRequestListTab;
