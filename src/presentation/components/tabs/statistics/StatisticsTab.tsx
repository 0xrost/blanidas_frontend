import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {UnlimitedPagination} from "@/domain/pagination.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";
import {useEquipmentModels} from "@/presentation/hooks/entities/equipment-model.ts";
import {useFailureTypes} from "@/presentation/hooks/entities/failure-type.ts";
import FilterPanel, {type FilterPanelValues} from "@/presentation/components/tabs/statistics/FilterPanel.tsx";
import InstitutionsBreakdownCountChart
    from "@/presentation/components/tabs/statistics/charts/InstitutionsBreakdownCountChart.tsx";
import {useDownloadStatistics, useStatistics} from "@/presentation/hooks/statistics.ts";
import {TimeDynamicsChart} from "@/presentation/components/tabs/statistics/charts/TimeDynamicsChart.tsx";
import FailureTypeChart from "@/presentation/components/tabs/statistics/charts/FailureTypesChart.tsx";
import ModelBreakdownChart from "@/presentation/components/tabs/statistics/charts/ModelBreakdownChart.tsx";
import AverageRepairTime from "@/presentation/components/tabs/statistics/charts/AverageRepairTime.tsx";
import EquipmentBreakdownsChart from "@/presentation/components/tabs/statistics/charts/EquipmentBreakdownsChart.tsx";
import {useState} from "react";
import UsedSparePartsChart from "@/presentation/components/tabs/statistics/charts/UsedSparePartsChart.tsx";
import ExportCard from "@/presentation/components/tabs/statistics/ExportCard.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import Notification from "@/presentation/components/layouts/Notification.tsx";


const initialValues: FilterPanelValues = {
    toDate: new Date(Date.now()),
    fromDate: new Date(0),
    timeStep: "month",
    failureTypeIds: [],
    modelIds: [],
    institutionIds: [],
};

const errorMessages = {
    "download": "Не вдалось завантажити статистику. Спробуйне пізніше."
}

const StatisticsTab = () => {
    const [filters, setFilters] = useState<FilterPanelValues>(initialValues);
    const [error, setError] = useTimedError<boolean>(false, 5000);
    const [isExportLoading, setIsExportLoading] = useState<boolean>(false);

    const {data: institutionsPagination} = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: modelsPagination} = useEquipmentModels({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: failureTypesPagination} = useFailureTypes({pagination: UnlimitedPagination, sorting: SortByNameAsc});

    const {refetch: refetchBlob} = useDownloadStatistics();
    const {data: statistics, isLoading, refetch: refetchStatistics} = useStatistics({
        equipmentModelIds: filters.modelIds,
        failureTypeIds: filters.failureTypeIds,
        institutionIds: filters.institutionIds,
        timeFrame: {
            toDate: filters.toDate,
            step: filters.timeStep,
            fromDate: filters.fromDate,
        }
    });

    const onRefresh = (values: FilterPanelValues) => {
        setFilters(values);
        void refetchStatistics();
    }

    const onDownload = async () => {
        setIsExportLoading(true);
        const response = await refetchBlob()
        if (!response.data || response.status === "error") {
            setError(true);
            setIsExportLoading(false);
            return;
        }

        setError(false);

        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.download = "statistics.xlsx";
        document.body.appendChild(link);
        link.click();
        link.remove();

        setIsExportLoading(false);
    };

    return (
        <div className="space-y-6">
            <FilterPanel
                initial={filters}
                refresh={onRefresh}
                isLoading={isLoading}
                institutions={institutionsPagination?.items ?? []}
                models={modelsPagination?.items ?? []}
                failureTypes={failureTypesPagination?.items ?? []}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TimeDynamicsChart data={statistics?.timeDynamics ?? []} timeStep={filters.timeStep} />
                <FailureTypeChart data={statistics?.failureTypes ?? []} />
                <ModelBreakdownChart data={statistics?.modelBreakdowns ?? []} />
                <UsedSparePartsChart data={statistics?.usedSpareParts ?? []} />
            </div>

            <InstitutionsBreakdownCountChart data={statistics?.institutionBreakdown ?? []} />
            <AverageRepairTime data={statistics?.averageRepairTime ?? []} />
            <EquipmentBreakdownsChart data={statistics?.equipmentBreakdowns ?? []} />

            <ExportCard export_={onDownload} isLoading={isExportLoading} />
            {error && <Notification type="error" message={errorMessages.download} />}
        </div>
    );
};

export default StatisticsTab;