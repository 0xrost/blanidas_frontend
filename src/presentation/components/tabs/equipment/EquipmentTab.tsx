import {type Pagination, UnlimitedPagination} from "@/domain/pagination.ts";
import {useEquipmentSummary} from "@/presentation/hooks/summary.ts";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import {Monitor, Plus} from "lucide-react";
import FiltersPanel from "@/presentation/components/layouts/FiltersPanel.tsx";
import {useEffect, useMemo, useState} from "react";
import {filterFieldsFactory, type SearchParams} from "@/presentation/components/tabs/equipment/filter.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {useManufacturers} from "@/presentation/hooks/entities/manufacturer.ts";
import {useEquipmentCategories} from "@/presentation/hooks/entities/equipment-category.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";
import {Button} from "@/presentation/components/ui/button.tsx";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {
    useCreateEquipment,
    useDeleteEquipment,
    useEquipment,
    useUpdateEquipment
} from "@/presentation/hooks/entities/equipment.ts";
import EquipmentTable from "@/presentation/components/tabs/equipment/EquipmentTable.tsx";
import type {Equipment} from "@/domain/entities/equipment.ts";
import QrModal from "@/presentation/components/tabs/equipment/QrModal.tsx";
import {useEquipmentModels} from "@/presentation/hooks/entities/equipment-model.ts";
import {useHandleMutation} from "@/presentation/hooks/useHandleMutation.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import {modalFieldsFactory} from "@/presentation/components/tabs/equipment/modal.ts";
import {useGetEquipmentIdQrCodeUrl} from "@/presentation/hooks/qrCode.ts";
import AddButton from "@/presentation/components/layouts/AddButton.tsx";


interface Props {
    pagination: Pagination;
    onSearchChange: (search: Pagination) => void;
}

const errorMessages = {
    serialNumber: "Обладнання з таким серійним номером вже існує, оберіть інший.",
    create: "Не вдалося створити обладнання. Спробуйте ще раз пізніше.",
    delete: "Не вдалося видалити обладнання. Спробуйте ще раз пізніше.",
    update: "Не вдалося оновити інформацію про обладнання. Спробуйте ще раз пізніше."
}

const EquipmentTab = ({ pagination, onSearchChange }: Props) => {
    const {data: institutionsPagination} = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: manufacturersPagination} = useManufacturers({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: modelsPagination} = useEquipmentModels({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: categoriesPagination} = useEquipmentCategories({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const {data: summary} = useEquipmentSummary();

    const createEquipment = useCreateEquipment();
    const updateEquipment = useUpdateEquipment();
    const deleteEquipment = useDeleteEquipment();

    const [localEquipment, setLocalEquipment] = useState<Equipment[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment| null>(null);
    const [creatingError, setCreatingError] = useState<string | null>(null);

    const qrCodeUrl = useGetEquipmentIdQrCodeUrl(selectedEquipment?.id ?? "")

    const [values, setValues] = useState<SearchParams>({
        institutionId: "all",
        modelId: "all",
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
            modelId: values.modelId === "all" ? undefined : values.modelId,
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
                actionButton={<AddButton onClick={() => setIsModalOpen(true)} title="Додати обладнання" />}
                searchPlaceholder={"Пошук за назвою або серійним кодом"}
                filters={filters}
                values={values}
            />

            <EquipmentTable
                equipment={localEquipment}
                institutions={institutionsPagination?.items ?? []}
                categories={categoriesPagination?.items ?? []}
                manufacturers={manufacturersPagination?.items ?? []}
                models={modelsPagination?.items ?? []}
                showQr={setSelectedEquipment}

                update={onUpdate}
                delete_={onDelete}
            />

            <PaginationControl items={equipmentPagination?.total ?? 0} pagination={pagination} onChange={onSearchChange} />
            <QrModal
                close={() => setSelectedEquipment(null)}
                equipment={selectedEquipment}
                dataToShow={qrCodeUrl}
            />

            <FormModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title="Створити обладнання"
                description="Внесіть інформацію про нове обладнання"
                fields={modalFields}
                submit={onCreate}
                submitText="Зберегти зміни"
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