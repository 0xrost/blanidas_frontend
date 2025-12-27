import {AlertCircle, CheckCircle2, Clock, Package} from "lucide-react";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import FilterCard, {type FilterConfig} from "@/presentation/components/layouts/FilterCard.tsx";
import {useMemo, useState} from "react";
import useRepairRequestSummary from "@/presentation/hooks/summary.ts";
import {useListEquipmentCategory} from "@/presentation/hooks/equipment-category.ts";
import {useListInstitution} from "@/presentation/hooks/institution.ts";
import {useListRepairRequest} from "@/presentation/hooks/repair-request.ts";
import PaginationControll from "@/presentation/components/layouts/PaginationControll.tsx";
import {Route} from "@/presentation/routes/engineer/dashboard/repair-requests";
import type {Pagination} from "@/domain/models/pagination.ts";
import RepairRequestsList from "@/presentation/components/tabs/repair-requests-list/RepairRequestsList.tsx";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";

const initialFilters: FilterConfig[] = [
    {
        key: 'institution',
        placeholder: 'Центр / Локація',
        options: [
            { value: 'all', label: 'Всі центри' },
        ],
    },
    {
        key: 'category',
        placeholder: 'Категорія',
        options: [
            { value: 'all', label: 'Всі категорії' },
        ],
    },
    {
        key: 'status',
        placeholder: 'Статус',
        options: [
            { value: 'all', label: 'Всі статуси' },
            { value: 'new', label: 'Новий' },
            { value: 'in-progress', label: 'У роботі' },
            { value: 'waiting-parts', label: 'Очікує запчастини' },
            { value: 'completed', label: 'Виконано' },
        ],
    },
    {
        key: 'priority',
        placeholder: 'Пріоритет',
        options: [
            { value: 'all', label: 'Всі пріоритети' },
            { value: 'critical', label: 'Критичний' },
            { value: 'normal', label: 'Звичайний' },
        ],
    },
    {
        key: 'orderBy',
        placeholder: 'Сортування',
        options: [
            { value: 'date', label: 'За датою' },
            { value: 'model', label: 'За моделлю' },
            { value: 'category', label: 'За категорією' },
            { value: 'priority', label: 'За пріоритетом' },
        ],
    },
];

const RepairRequestListTab = () => {
    const navigate = Route.useNavigate();
    const { page, limit } = Route.useSearch();

    const [searchQuery, setSearchQuery] = useState("");
    const [values, setValues] = useState({
        institutionId: 'all',
        equipmentCategoryId: 'all',
        status: 'all',
        orderBy: 'date',
        urgencyLevel: 'all'
    });

    console.log(values);
    const { data: summary } = useRepairRequestSummary();
    const { data: equipment_categories } = useListEquipmentCategory(1, -1);
    const { data: institutions } = useListInstitution(1, -1);
    const { data: repairRequestsPagination, isSuccess } = useListRepairRequest(
        { page: page, limit: limit },
        {  },
        "status"
    );

    const filters = useMemo<FilterConfig[]>(() => {
        const equipment_categories_ = equipment_categories ? equipment_categories : [];
        const institutions_ = institutions ? institutions : [];

        return initialFilters.map(filter => {
            if (filter.key === 'category' || filter.key === 'institution') {
                const items = filter.key === 'category' ? equipment_categories_ : institutions_;
                const label = filter.key === 'category' ? 'Всі категорії' : 'Всі центри';
                return {
                    ...filter,
                    options: [
                        { value: 'all', label: label },
                        ...items.map(cat => ({
                            value: cat.id.toString(),
                            label: cat.name,
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
        <div>
            <div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <DashboardCard label={"Нові"} value={summary ? summary?.new : 0} color={"red"} icon={AlertCircle} />
                    <DashboardCard label={"У роботі"} value={summary ? summary?.inProgress : 0} color={"orange"} icon={Clock} />
                    <DashboardCard label={"Очікує запчастини"} value={summary ? summary?.waitingSpareParts : 0} color={"yellow"} icon={Package} />
                    <DashboardCard label={"Виконвно"} value={summary ? summary?.finished : 0} color={"green"} icon={CheckCircle2} />
                </div>
                <FilterCard
                    searchValue={searchQuery}
                    onSearchChange={setSearchQuery}
                    searchPlaceholder="Пошук за моделлю або серійним номером"
                    filters={filters}
                    values={values}
                    onChange={(key, value) =>
                        setValues((prev) => ({ ...prev, [key]: value }))
                    }
                />
                <div className="space-y-4">
                    {isSuccess && <RepairRequestsList repairRequests={repairRequestsPagination?.items ?? []} onOpenItemDetails={onOpenItemDetails} />}
                </div>
                <PaginationControll changePagination={onPaginationChange} pagination={{ page: page, limit: limit }} items={repairRequestsPagination?.total ?? 0} />
            </div>
        </div>
    );
};

export default RepairRequestListTab;
