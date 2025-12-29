import {AlertTriangle, CheckCircle, Package, XCircle} from "lucide-react";
import {useSparePartsSummary} from "@/presentation/hooks/summary.ts";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import FilterCard, {type FilterCardValues, type FilterConfig} from "@/presentation/components/layouts/FilterCard.tsx";
import type {SparePart, SparePartStatus} from "@/domain/entities/spare-part.ts";
import {useEffect, useState} from "react";
import type {SparePartsSortBy} from "@/domain/query/spare-part.query.ts";
import {useSpareParts, useUpdateSparePart} from "@/presentation/hooks/spare-part.ts";
import SparePartsList from "@/presentation/components/tabs/spare-parts/SparePartsList.tsx";
import type {AddLocationForm} from "@/presentation/components/tabs/spare-parts/SparePartsListItem.tsx";
import context from "@/context.tsx";
import type {LocationCreate, SparePartUpdate} from "@/domain/models/spare-parts.ts";

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

const SparePartsListTab = () => {
    const [spareParts, setSpareParts] = useState<SparePart[]>([]);
    const [values, setValues] = useState<SearchParams>({
        institutionId: "all",
        sparePartCategoryId: "all",
        sparePartModelId: "all",
        status: "all",
        sortOrder: "desc",
        sortBy: "name",
        search: ""
    });

    const updateSparePart = useUpdateSparePart()
    const { data: summary, refetch: refetchSummary } = useSparePartsSummary();
    const { data: sparePartsPagination } = useSpareParts(
        { page: 1, limit: 10 },
        {},
        {
            sortBy: "name",
            sortOrder: "desc",
        },
    )

    useEffect(() => {
        if (sparePartsPagination) {
            setSpareParts(sparePartsPagination.items);
        }
    }, [sparePartsPagination]);

    const update = (data: SparePartUpdate) => {
        updateSparePart.mutate(
            data,
            {
                onSuccess: async (data) => {
                    setSpareParts((prev) => {
                        return prev.map(x => {
                            if (x.id === data.id) return data;
                            return x;
                        })
                    });
                    refetchSummary();
                },
            }
        );
    }

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
                filters={initialFilters}
                searchPlaceholder={"Пошук за назвою або кодом запчастини"}
            />
            <SparePartsList
                spareParts={spareParts}
                updateSparePart={update}
            />
        </div>
    );
};

export default SparePartsListTab;