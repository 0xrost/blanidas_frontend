import {type Pagination, UnlimitedPagination} from "@/domain/pagination.ts";
import {useEquipmentSummary} from "@/presentation/hooks/summary.ts";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import {Monitor, Plus} from "lucide-react";
import FiltersPanel from "@/presentation/components/layouts/FiltersPanel.tsx";
import {useEffect, useMemo, useState} from "react";
import {filtersFactory, type SearchParams} from "@/presentation/components/tabs/equipment/filters.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {useManufacturers} from "@/presentation/hooks/entities/manufacturer.ts";
import {useEquipmentCategories} from "@/presentation/hooks/entities/equipment-category.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";
import {Button} from "@/presentation/components/ui/button.tsx";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {useEquipment} from "@/presentation/hooks/entities/equipment.ts";
import EquipmentTable from "@/presentation/components/tabs/equipment/EquipmentTable.tsx";
import type {Equipment} from "@/domain/entities/equipment.ts";
import QrModal from "@/presentation/components/tabs/equipment/QrModal.tsx";



interface Props {
    pagination: Pagination;
    onSearchChange: (search: Pagination) => void;
}
const EquipmentTab = ({ pagination, onSearchChange }: Props) => {
    const {data: institutionsPagination} = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: manufacturersPagination} = useManufacturers({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: categoriesPagination} = useEquipmentCategories({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: summary} = useEquipmentSummary();

    const [localEquipment, setLocalEquipment] = useState<Equipment[]>([]);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment| null>(null);

    const [values, setValues] = useState<SearchParams>({
        institutionId: "all",
        categoryId: "all",
        manufacturerId: "all",
        status: "all",
        sortOrder: "asc",
        sortBy: "name",
        search: ""
    });

    const {data: equipmentPagination} = useEquipment({
        pagination,
        filters: {
            nameOrSerialNumber: values.search.trim().length < 2 ? undefined : values.search.trim(),
            manufacturerId: values.manufacturerId === "all" ? undefined : values.manufacturerId,
            institutionId: values.institutionId === "all" ? undefined : values.institutionId,
            categoryId: values.categoryId === "all" ? undefined : values.categoryId,
            status: values.status === "all" ? undefined : values.status,
        },
        sorting: {
            sortBy: values.sortBy,
            sortOrder: values.sortOrder,
        }
    });

    useEffect(() => {
        if (equipmentPagination) setLocalEquipment(equipmentPagination.items);
    }, [equipmentPagination]);

    const filters = useMemo(() => {
        return filtersFactory(
            institutionsPagination?.items ?? [],
            categoriesPagination?.items ?? [],
            manufacturersPagination?.items ?? [],
        )
    }, [institutionsPagination, categoriesPagination, manufacturersPagination]);

    const createButton = (
        <Button
            className="h-12 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200">
            <Plus className="w-8 h-8" />
            Додати обладнання
        </Button>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard label="Всього обладнання" value={summary?.total ?? 0} color="slate" icon={Monitor} />
                <DashboardCard label="Робоче" value={summary?.working ?? 0} color="green" icon={Monitor} />
                <DashboardCard label="На обслуговуванні" value={summary?.underMaintenance ?? 0} color="yellow" icon={Monitor} />
                <DashboardCard label="Не працює" value={summary?.notWorking ?? 0} color="red" icon={Monitor} />
            </div>
            <FiltersPanel
                setValues={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
                values={values}
                actionButton={createButton}
                filters={filters}
                searchPlaceholder={"Пошук за назвою або серійним кодом"}
            />

            <EquipmentTable equipment={localEquipment} showQr={setSelectedEquipment} />

            <PaginationControl items={equipmentPagination?.total ?? 0} pagination={pagination} onChange={onSearchChange} />
            <QrModal
                close={() => setSelectedEquipment(null)}
                equipment={selectedEquipment}
            />
        </div>
    );
};

export default EquipmentTab;