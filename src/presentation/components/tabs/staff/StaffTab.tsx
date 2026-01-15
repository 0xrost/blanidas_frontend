import FiltersPanel from "@/presentation/components/layouts/FiltersPanel.tsx";
import {useEffect, useMemo, useState} from "react";
import StaffTable from "@/presentation/components/tabs/staff/StaffTable.tsx";
import {useCreateUser, useDeleteUser, useUpdateUser, useUsers} from "@/presentation/hooks/entities/user.ts";
import {type Pagination, UnlimitedPagination} from "@/domain/pagination.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {composeMutationOptions} from "@/presentation/utils.ts";
import type {User} from "@/domain/entities/user.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {modalFieldsFactory, type MemberFormData} from "@/presentation/components/tabs/staff/modal.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import {filterFields, type SearchParams} from "@/presentation/components/tabs/staff/filter.ts";
import AddButton from "@/presentation/components/layouts/AddButton.tsx";
import {useHandleMutation} from "@/presentation/hooks/useHandleMutation.ts";
import type {ErrorCode, RequestError} from "@/infrastructure/errors.ts";
import {useOnSetValue} from "@/presentation/hooks/useOnSetValue.ts";
import {useOnPaginationChange} from "@/presentation/hooks/useOnPaginationChange.ts";
import type {Search} from "@/presentation/routes/_authenticated/manager/dashboard/settings.tsx";


interface Props {
    pagination: Pagination
    onSearchChange: (fn: (prev: Search) => Search) => void;
    searchParams: SearchParams;
}

const errorMessages = {
    emailExists: "Цей Email вже використовується, оберіть інший.",
    emailFormat: "Неправильний формат email.",
    phoneFormat: "Неправильний формат номера телефону.",
    create: "Не вдалося створити співробітника. Спробуйте ще раз пізніше.",
    delete: "Не вдалося видалити співробітника. Спробуйте ще раз пізніше.",
    update: "Не вдалося оновити інформацію про співробтіника. Спробуйте ще раз пізніше."
}

const errorCodeMap: Record<ErrorCode, string> = {
    "invalid email format": errorMessages.emailFormat,
    "invalid phone format": errorMessages.phoneFormat,
    "value already exists": errorMessages.emailExists,
}

const StaffTab = ({ pagination, onSearchChange, searchParams }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [localStaff, setLocalStaff] = useState<User[]>([]);

    const [error, setError] = useTimedError<string | null>(null, 5000);

    const onSetValue = useOnSetValue(onSearchChange);
    const onPaginationChange = useOnPaginationChange(onSearchChange);


    const createMember = useCreateUser();
    const updateMember = useUpdateUser();
    const deleteMember = useDeleteUser();

    const {data: institutionsPagination} = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc});

    const {data: staffPagination} = useUsers({
        pagination: pagination,
        filters: {
            username: searchParams.search.trim().length < 2 ? undefined : searchParams.search.trim(),
            role: searchParams.role === "all" ? undefined : searchParams.role,
        },
        sorting: {
            sortBy: "username",
            sortOrder: searchParams.sortOrder,
        }
    });

    const modalFields = useMemo(() => {
        return modalFieldsFactory(institutionsPagination?.items ?? [], true);
    }, [institutionsPagination]);

    useEffect(() => { if (staffPagination !== undefined) setLocalStaff(staffPagination.items); }, [staffPagination]);

    const onCreate = (data: MemberFormData, options?: MutationOptions<User>) => {
        createMember.mutate({
            ...data,
            password: data.password.trim(),
            username: data.firstName + " " + data.lastName,
        }, composeMutationOptions({
            onSuccess: (data) => {
                setLocalStaff(prev => [data, ...prev]);
                setError(null);
            },
            onError: onError,
        }, options));
    }

    const onError = (error?: RequestError): void => {
        if (!error) return;

        if (error.code in errorCodeMap) {
            setError(errorCodeMap[error.code]);
            return;
        }

        setError(errorMessages.create);
    }


    const onUpdate = useHandleMutation(updateMember,
        (data) => { setLocalStaff(prev => prev.map(x => { return x.id !== data.id ? x : data; }))
    })

    const onDelete = useHandleMutation(deleteMember,
        (id) => { setLocalStaff(prev => { return prev.filter(x => x.id !== id); })}
    )

    return (
        <div className="space-y-6">
            <FiltersPanel
                values={searchParams}
                inlineFilter={filterFields}
                searchPlaceholder={"Пошук за ім'ям та прізвищем працівника"}
                actionButton={<AddButton onClick={() => setIsModalOpen(true)} title="Додати працівника" />}
                setValues={onSetValue}
            />

            <StaffTable
                staff={localStaff}
                delete_={onDelete}
                update={onUpdate}
                institutions={institutionsPagination?.items ?? []}
            />

            <PaginationControl
                items={staffPagination?.total ?? 0}
                pagination={pagination}
                onChange={onPaginationChange}
            />

            <FormModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title="Додати працівника"
                description="Внесіть інформацію про нового працівника"
                submit={onCreate}
                fields={modalFields}
                errors={error ? [error] : []}
                submitText="Додати працівника"
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    password: "",
                    role: "manager",
                    department: "",
                    workplaceId: "",
                    hireAt: new Date(),
                    receiveLowStockNotification: false,
                    receiveRepairRequestCreatedNotification: false,
                }}
            />
        </div>
    );
};

export default StaffTab;
export { errorMessages, errorCodeMap };