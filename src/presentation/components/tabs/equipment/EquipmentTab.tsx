import {type Pagination, UnlimitedPagination} from "@/domain/pagination.ts";
import {useEquipmentSummary} from "@/presentation/hooks/summary.ts";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import {Monitor, QrCodeIcon} from "lucide-react";
import FiltersPanel from "@/presentation/components/layouts/FiltersPanel.tsx";
import {useEffect, useMemo, useState} from "react";
import {filterFieldsFactory, type SearchParams} from "@/presentation/components/tabs/equipment/filter.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {useManufacturers} from "@/presentation/hooks/entities/manufacturer.ts";
import {useEquipmentCategories} from "@/presentation/hooks/entities/equipment-category.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {
    useCreateEquipment,
    useDeleteEquipment,
    useEquipment, useEquipmentQrData,
    useUpdateEquipment
} from "@/presentation/hooks/entities/equipment.ts";
import EquipmentTable from "@/presentation/components/tabs/equipment/EquipmentTable.tsx";
import type {Equipment} from "@/domain/entities/equipment.ts";
import QrModal from "@/presentation/components/tabs/equipment/QrModal.tsx";
import {useEquipmentModels} from "@/presentation/hooks/entities/equipment-model.ts";
import {useHandleMutation} from "@/presentation/hooks/useHandleMutation.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import {modalFieldsFactory} from "@/presentation/components/tabs/equipment/modal.ts";
import {useEquipmentQrCodes} from "@/presentation/hooks/qrCode.ts";
import AddButton from "@/presentation/components/layouts/AddButton.tsx";
import {useOnSetValue} from "@/presentation/hooks/useOnSetValue.ts";
import {useOnPaginationChange} from "@/presentation/hooks/useOnPaginationChange.ts";
import type {PaginationSearch} from "@/presentation/models.ts";
import {Button} from "@/presentation/components/ui/button.tsx";

type Search = PaginationSearch & SearchParams;

interface Props {
    pagination: Pagination;
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: SearchParams;
}

const errorMessages = {
    serialNumber: "Обладнання з таким серійним номером вже існує, оберіть інший.",
    create: "Не вдалося створити обладнання. Спробуйте ще раз пізніше.",
    delete: "Не вдалося видалити обладнання. Спробуйте ще раз пізніше.",
    update: "Не вдалося оновити інформацію про обладнання. Спробуйте ще раз пізніше."
}

const EquipmentTab = ({ pagination, searchParams, onSearchChange }: Props) => {
    const {data: institutionsPagination} = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: manufacturersPagination} = useManufacturers({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: modelsPagination} = useEquipmentModels({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: categoriesPagination} = useEquipmentCategories({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: equipmentQrData} = useEquipmentQrData();
    const {data: summary} = useEquipmentSummary();

    const onSetValue = useOnSetValue(onSearchChange);
    const onPaginationChange = useOnPaginationChange(onSearchChange);

    const createEquipment = useCreateEquipment();
    const updateEquipment = useUpdateEquipment();
    const deleteEquipment = useDeleteEquipment();

    const [localEquipment, setLocalEquipment] = useState<Equipment[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [creatingError, setCreatingError] = useState<string | null>(null);

    const [qrCodes, setData] = useEquipmentQrCodes([])

    const {data: equipmentPagination} = useEquipment({
        pagination,
        filters: {
            nameOrSerialNumber: searchParams.search.trim().length < 2 ? undefined : searchParams.search.trim(),
            manufacturerId: searchParams.manufacturerId === "all" ? undefined : searchParams.manufacturerId,
            institutionId: searchParams.institutionId === "all" ? undefined : searchParams.institutionId,
            modelId: searchParams.modelId === "all" ? undefined : searchParams.modelId,
            status: searchParams.status === "all" ? undefined : searchParams.status,
        },
        sorting: {
            sortBy: searchParams.sortBy,
            sortOrder: searchParams.sortOrder,
        }
    });

    useEffect(() => {
        if (equipmentPagination) setLocalEquipment(equipmentPagination.items);
    }, [equipmentPagination]);

    const filters = useMemo(() => {
        return filterFieldsFactory(
            institutionsPagination?.items ?? [],
            modelsPagination?.items ?? [],
            manufacturersPagination?.items ?? [],
        )
    }, [institutionsPagination, modelsPagination, manufacturersPagination]);

    const modalFields = useMemo(
        () => modalFieldsFactory(
            institutionsPagination?.items ?? [],
            modelsPagination?.items ?? [],
            manufacturersPagination?.items ?? [],
            categoriesPagination?.items ?? [],
    ), [institutionsPagination, modelsPagination, manufacturersPagination, categoriesPagination])

    const onCreate = useHandleMutation(createEquipment,
        (data) => {
            setLocalEquipment(prev => [data, ...prev]);
            setCreatingError(null);
        },
        (error) => setCreatingError(
            error?.code == "value already exists" && error.fields == "serial_number"
                ? errorMessages.serialNumber
                : errorMessages.create
        )
    )

    const onUpdate = useHandleMutation(updateEquipment,
        (data) => {
            setLocalEquipment(prev => prev.map(x => {
                if (x.id !== data.id) return x;
                return data;
            }))
        },
    )

    const onDelete = useHandleMutation(deleteEquipment,
        (id) => {setLocalEquipment(prev => { return prev.filter(x => x.id !== id); })}
    )

    const actionButton = (
        <>
            <Button
                disabled={!equipmentQrData}
                onClick={() => setData(equipmentQrData ?? [])}
                className="h-12 min-w-12 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200">
                <QrCodeIcon className="w-8 h-8" />
            </Button>
            <AddButton onClick={() => setIsModalOpen(true)} title="Додати обладнання" />
        </>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard
                    label="Всього обладнання"
                    value={summary?.total ?? 0}
                    color="slate"
                    icon={Monitor}
                    selected={searchParams.status === "all"}
                    onClick={() => onSearchChange((prev) => ({...prev, status: "all", page: "1"}))}
                />
                <DashboardCard
                    label="Робоче"
                    value={summary?.working ?? 0}
                    color="green"
                    icon={Monitor}
                    selected={searchParams.status === "working"}
                    onClick={() => onSearchChange((prev) => ({...prev, status: "working", page: "1"}))}
                />
                <DashboardCard
                    label="На обслуговуванні"
                    value={summary?.underMaintenance ?? 0}
                    color="yellow"
                    icon={Monitor}
                    selected={searchParams.status === "under_maintenance"}
                    onClick={() => onSearchChange((prev) => ({...prev, status: "under_maintenance", page: "1"}))}
                />
                <DashboardCard
                    label="Не працює"
                    value={summary?.notWorking ?? 0}
                    color="red"
                    icon={Monitor}
                    selected={searchParams.status === "not_working"}
                    onClick={() => onSearchChange((prev) => ({...prev, status: "not_working", page: "1"}))}
                />
            </div>
            <FiltersPanel
                setValues={onSetValue}
                actionButton={actionButton}
                searchPlaceholder={"Пошук за назвою або серійним кодом"}
                filters={filters}
                values={searchParams}
            />

            <EquipmentTable
                equipment={localEquipment}
                institutions={institutionsPagination?.items ?? []}
                categories={categoriesPagination?.items ?? []}
                manufacturers={manufacturersPagination?.items ?? []}
                models={modelsPagination?.items ?? []}
                showQr={(x) => setData([{
                    id: x.id,
                    serialNumber: x.serialNumber,
                    institutionName: x.institution.name,
                }])}

                update={onUpdate}
                delete_={onDelete}
            />

            <PaginationControl
                items={equipmentPagination?.total ?? 0}
                pagination={pagination}
                onChange={onPaginationChange}
            />
            <QrModal
                close={() => setData([])}
                dataToShow={qrCodes}
            />

            <FormModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title="Створити обладнання"
                description="Внесіть інформацію про нове обладнання"
                fields={modalFields}
                submit={onCreate}
                submitText="Додати обладнання"
                errors={creatingError ? [creatingError] : []}
                initialValues={{
                    location: "",
                    serialNumber: "",
                    institutionId: "",
                    modelId: "",
                    manufacturerId: "",
                    categoryId: "",
                    installed: new Date(),
                }}
            />
        </div>
    );
};

export default EquipmentTab;
export { errorMessages };