import {AlertCircle, CheckCircle2, Clock, Package} from "lucide-react";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import FiltersPanel, {type FiltersPanelValues, type FilterConfig} from "@/presentation/components/layouts/FiltersPanel.tsx";
import {useMemo, useState} from "react";
import {useRepairRequestsSummary} from "@/presentation/hooks/summary.ts";
import {useEquipmentCategories} from "@/presentation/hooks/entities/equipment-category.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {useRepairRequests} from "@/presentation/hooks/entities/repair-request.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import RepairRequestsList from "@/presentation/components/tabs/repair-requests-list/RepairRequestsList.tsx";
import type {RepairRequest, Status, Urgency} from "@/domain/entities/repair-request.ts";
import type {RepairRequestSortBy} from "@/domain/queries/repair-request-list.query.ts";
import {useNavigate} from "@tanstack/react-router";
import {SortByNameAsc} from "@/domain/sorting.ts";
import {UnlimitedPagination} from "@/domain/pagination.ts";

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

interface SearchParams extends FiltersPanelValues {
    institutionId: string;
    equipmentCategoryId: string;
    status: Status | "all";
    sortBy: RepairRequestSortBy;
    urgency: Urgency | "all";
}

interface Props {
    page: number;
    limit: number;
    url: string;
    detailsUrl: string;
}

const RepairRequestListTab = ({page, limit, url, detailsUrl}: Props) => {
    const navigate = useNavigate();
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
    const { data: equipmentCategoriesPagination } = useEquipmentCategories({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const { data: institutionsPagination } = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const { data: repairRequestsPagination, isSuccess } = useRepairRequests({
        pagination: { page: page, limit: limit },
        filters: {
            urgency: values.urgency === "all" ? undefined : values.urgency,
            status: values.status === "all" ? undefined : values.status,
            equipmentCategoryId: values.equipmentCategoryId === "all" ? undefined : values.equipmentCategoryId,
            institutionId: values.institutionId === "all" ? undefined : values.institutionId,
            serialNumberOrEquipmentName: values.search.trim().length === 0 ? undefined : values.search.trim(),
        },
        sorting: { sortBy: values.sortBy, sortOrder: values.sortOrder }
    });

    const filters = useMemo<FilterConfig[]>(() => {
        const mapper: Record<string, { id: string, name: string }[]> = {
            "institutionId": institutionsPagination?.items ?? [],
            "equipmentCategoryId": equipmentCategoriesPagination?.items ?? [],
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
    }, [equipmentCategoriesPagination, institutionsPagination]);

    const onOpenItemDetails = (repairRequest: RepairRequest) => {
        void navigate({to: detailsUrl, params: {repairRequestId: repairRequest.id}});
    }

    return (
        <div className="w-full">
            <div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <DashboardCard label={"Нові"} value={summary?.new ?? 0} color="red" icon={AlertCircle} />
                    <DashboardCard label={"У роботі"} value={summary?.inProgress ?? 0} color="orange" icon={Clock} />
                    <DashboardCard label={"Очікує запчастини"} value={summary?.waitingSpareParts ?? 0} color="yellow" icon={Package} />
                    <DashboardCard label={"Виконвно"} value={summary?.finished ?? 0} color="green" icon={CheckCircle2} />
                </div>
                <FiltersPanel
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
                <PaginationControl
                    url={url}
                    pagination={{ page: page, limit: limit }}
                    items={repairRequestsPagination?.total ?? 0}
                />
            </div>
        </div>
    );
};

export default RepairRequestListTab;
