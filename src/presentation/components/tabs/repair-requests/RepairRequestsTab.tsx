import {AlertCircle, CheckCircle2, Clock, Package} from "lucide-react";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import FiltersPanel, {type FilterConfig} from "@/presentation/components/layouts/FiltersPanel.tsx";
import {useMemo} from "react";
import {useRepairRequestsSummary} from "@/presentation/hooks/summary.ts";
import {useEquipmentCategories} from "@/presentation/hooks/entities/equipment-category.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {useRepairRequests} from "@/presentation/hooks/entities/repair-request.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {SortByNameAsc} from "@/domain/sorting.ts";
import {type Pagination, UnlimitedPagination} from "@/domain/pagination.ts";
import RepairRequestsTable from "@/presentation/components/tabs/repair-requests/RepairRequestsTable.tsx";
import {filtersFactory, type SearchParams} from "@/presentation/components/tabs/repair-requests/filters.ts";
import type {Search} from "@/presentation/routes/_authenticated/manager/dashboard/repair-requests";
import {useOnSetValue} from "@/presentation/hooks/useOnSetValue.ts";
import {useOnPaginationChange} from "@/presentation/hooks/useOnPaginationChange.ts";


interface Props {
    pagination: Pagination
    onGoToDetails: (id: string) => void;

    searchParams: SearchParams;
    onSearchChange: (fn: (prev: Search) => Search) => void;
}

const RepairRequestListTab = ({pagination, onGoToDetails, searchParams, onSearchChange}: Props) => {
    const onSetValue = useOnSetValue(onSearchChange);
    const onPaginationChange = useOnPaginationChange(onSearchChange);

    const { data: summary } = useRepairRequestsSummary();
    const { data: equipmentCategoriesPagination } = useEquipmentCategories({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const { data: institutionsPagination } = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const { data: repairRequestsPagination } = useRepairRequests({
        pagination,
        filters: {
            urgency: searchParams.urgency === "all" ? undefined : searchParams.urgency,
            status: searchParams.status === "all" ? undefined : searchParams.status,
            equipmentCategoryId: searchParams.categoryId === "all" ? undefined : searchParams.categoryId,
            institutionId: searchParams.institutionId === "all" ? undefined : searchParams.institutionId,
            serialNumberOrEquipmentName: searchParams.search.trim().length < 2 ? undefined : searchParams.search.trim(),
        },
        sorting: { sortBy: searchParams.sortBy, sortOrder: searchParams.sortOrder }
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
                    values={searchParams}
                    searchPlaceholder="Пошук за моделлю або серійним номером"
                    setValues={onSetValue}
                />
                <RepairRequestsTable
                    repairRequests={repairRequestsPagination?.items ?? []}
                    onGoToDetails={onGoToDetails}
                />

                <PaginationControl
                    onChange={(x) => {
                        console.log(x);
                        onPaginationChange(x)

                    }}
                    pagination={pagination}
                    items={repairRequestsPagination?.total ?? 0}
                />
            </div>
        </div>
    );
};

export default RepairRequestListTab;
