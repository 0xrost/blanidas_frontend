import {AlertCircle, CheckCircle2, Clock, Package} from "lucide-react";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import FilterCard, {type FilterCardValues, type FilterConfig} from "@/presentation/components/layouts/FilterCard.tsx";
import {useMemo, useState} from "react";
import {useRepairRequestsSummary} from "@/presentation/hooks/summary.ts";
import {useEquipmentCategories} from "@/presentation/hooks/equipment-category.ts";
import {useInstitutions} from "@/presentation/hooks/institution.ts";
import {useRepairRequests} from "@/presentation/hooks/repair-request.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {Route} from "@/presentation/routes/engineer/dashboard/repair-requests";
import {type Pagination, UnlimitedPagination} from "@/domain/models/pagination.ts";
import RepairRequestsList from "@/presentation/components/tabs/repair-requests-list/RepairRequestsList.tsx";
import type {RepairRequest, Status, Urgency} from "@/domain/entities/repair-request.ts";
import type {RepairRequestSortBy} from "@/domain/query/repair-request.query.ts";

const initialFilters: FilterConfig[] = [
    {
        key: 'institutionId',
        options: [
            { value: 'all', label: 'Всі центри' },
        ],
    },
    {
        key: 'equipmentCategoryId',
        options: [
            { value: 'all', label: 'Всі категорії' },
        ],
    },
    {
        key: 'status',
        options: [
            { value: 'all', label: 'Всі статуси' },
            { value: 'not_taken', label: 'Новий' },
            { value: 'in_progress', label: 'У роботі' },
            { value: 'waiting_spare_parts', label: 'Очікує запчастини' },
            { value: 'finished', label: 'Виконано' },
        ],
    },
    {
        key: 'urgency',
        options: [
            { value: 'all', label: 'Всі пріоритети' },
            { value: 'critical', label: 'Критичний' },
            { value: 'non_critical', label: 'Звичайний' },
        ],
    },
    {
        key: 'sortBy',
        options: [
            { value: 'date', label: 'За датою' },
            { value: 'model', label: 'За моделлю' },
            { value: 'status', label: 'За статусом' },
            { value: 'urgency', label: 'За пріоритетом' },
        ],
    },
];

interface SearchParams extends FilterCardValues {
    institutionId: string;
    equipmentCategoryId: string;
    status: Status | "all";
    sortBy: RepairRequestSortBy;
    urgency: Urgency | "all";
}

const RepairRequestListTab = () => {
    const navigate = Route.useNavigate();
    const { page, limit } = Route.useSearch();

    const [values, setValues] = useState<SearchParams>({
        sortOrder: "desc",
        search: "",
        institutionId: 'all',
        equipmentCategoryId: 'all',
        status: 'all',
        sortBy: 'date',
        urgency: 'all'
    });

    const { data: summary } = useRepairRequestsSummary();
    const { data: equipment_categories } = useEquipmentCategories(UnlimitedPagination);
    const { data: institutions } = useInstitutions(UnlimitedPagination);
    const { data: repairRequestsPagination, isSuccess } = useRepairRequests(
        { page: page, limit: limit },
        {
            urgency: values.urgency === "all" ? undefined : values.urgency,
            status: values.status === "all" ? undefined : values.status,
            equipmentCategoryId: values.equipmentCategoryId === "all" ? undefined : values.equipmentCategoryId,
            institutionId: values.institutionId === "all" ? undefined : values.institutionId,
            serialNumberOrEquipmentName: values.search.trim().length === 0 ? undefined : values.search.trim(),
        },
        {
            sortBy: values.sortBy,
            sortOrder: values.sortOrder,
        }
    );

    const filters = useMemo<FilterConfig[]>(() => {
        const equipment_categories_ = equipment_categories?.items ?? [];
        const institutions_ = institutions?.items ?? [];

        return initialFilters.map(filter => {
            if (filter.key === 'equipmentCategoryId' || filter.key === 'institutionId') {
                const items = filter.key === 'equipmentCategoryId' ? equipment_categories_ : institutions_;
                const label = filter.key === 'equipmentCategoryId' ? 'Всі категорії' : 'Всі центри';
                return {
                    ...filter,
                    options: [
                        { value: 'all', label: label },
                        ...items.map(item => ({
                            value: item.id.toString(),
                            label: item.name,
                        })),
                    ],
                };
            }

            return filter;
        });
    }, [equipment_categories, institutions]);

    const onPaginationChange = (pagination: Pagination) =>
        navigate({search: { page: pagination.page, limit: pagination.limit }});
    const onOpenItemDetails = (repairRequest: RepairRequest) =>
        navigate({to: "/engineer/dashboard/repair-requests/$repairRequestId", params: {repairRequestId: repairRequest.id.toString()}});

    return (
        <div className="w-full">
            <div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <DashboardCard label={"Нові"} value={summary ? summary?.new : 0} color="red" icon={AlertCircle} />
                    <DashboardCard label={"У роботі"} value={summary ? summary?.inProgress : 0} color="orange" icon={Clock} />
                    <DashboardCard label={"Очікує запчастини"} value={summary ? summary?.waitingSpareParts : 0} color="yellow" icon={Package} />
                    <DashboardCard label={"Виконвно"} value={summary ? summary?.finished : 0} color="green" icon={CheckCircle2} />
                </div>
                <FilterCard
                    filters={filters}
                    values={values}
                    searchPlaceholder="Пошук за моделлю або серійним номером"
                    setValues={(key, value) =>
                        setValues((prev) => ({ ...prev, [key]: value }))
                    }
                />
                <div className="space-y-4">
                    {isSuccess && <RepairRequestsList repairRequests={repairRequestsPagination?.items ?? []} onOpenItemDetails={onOpenItemDetails} />}
                </div>
                <PaginationControl changePagination={onPaginationChange} pagination={{ page: page, limit: limit }} items={repairRequestsPagination?.total ?? 0} />
            </div>
        </div>
    );
};

export default RepairRequestListTab;
