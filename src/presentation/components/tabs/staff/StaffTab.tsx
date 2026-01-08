import FiltersPanel from "@/presentation/components/layouts/FiltersPanel.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import StaffTable from "@/presentation/components/tabs/staff/StaffTable.tsx";
import {useCreateUser, useDeleteUser, useUpdateUser, useUsers} from "@/presentation/hooks/entities/user.ts";
import {type Pagination, UnlimitedPagination} from "@/domain/pagination.ts";
import {useAuthSession} from "@/presentation/hooks/auth.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {composeMutationOptions} from "@/presentation/utils.ts";
import type {User} from "@/domain/entities/user.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";
import type {UserUpdate} from "@/domain/models/user.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {modalFieldsFactory, type MemberFormData} from "@/presentation/components/tabs/staff/modal.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import {filterFields, type SearchParams} from "@/presentation/components/tabs/staff/filter.ts";
import AddButton from "@/presentation/components/layouts/AddButton.tsx";
import {useHandleMutation} from "@/presentation/hooks/useHandleMutation.ts";


interface Props {
    pagination: Pagination
    onChange: (pagination: Pagination) => void;
}

const errorMessages = {
    email: "Цей Email вже використовується, оберіть інший.",
    create: "Не вдалося створити співробітника. Спробуйте ще раз пізніше.",
    delete: "Не вдалося видалити співробітника. Спробуйте ще раз пізніше.",
    update: "Не вдалося оновити інформацію про співробтіника. Спробуйте ще раз пізніше."
}

const StaffTab = ({ pagination, onChange }: Props) => {
    const [values, setValues] = useState<SearchParams>({search: "", role: "all", sortOrder: "asc"});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [localStaff, setLocalStaff] = useState<User[]>([]);

    const [error, setError] = useTimedError<string | null>(null, 5000);

    const authSession = useAuthSession();

    const createMember = useCreateUser();
    const updateMember = useUpdateUser();
    const deleteMember = useDeleteUser();

    const {data: institutionsPagination} = useInstitutions({pagination: UnlimitedPagination, sorting: SortByNameAsc});

    const {data: staffPagination} = useUsers({
        pagination: pagination,
        filters: {
            username: values.search.trim().length < 2 ? undefined : values.search.trim(),
            role: values.role === "all" ? undefined : values.role,
        },
        sorting: {
            sortBy: "username",
            sortOrder: values.sortOrder,
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
            onError: (error) => {
                setError(error?.code === "value already exists" && error?.fields == "email"
                    ? errorMessages.email
                    : errorMessages.create
                );
            }
        }, options));
    }

    const onUpdate = useCallback(
        (data: UserUpdate, options?: MutationOptions<User>) => {
            updateMember.mutate(data, composeMutationOptions({
                onSuccess: (data) => {
                    if (data.id === authSession?.currentUser.id) {
                        return;
                    }

                    setLocalStaff(prev => prev.map(x => {
                        if (x.id !== data.id) return x;
                        return data;
                    }))
                }
            }, options))
        }, [authSession, updateMember]
    );

    const onDelete = useHandleMutation(deleteMember,
        (id) => { setLocalStaff(prev => { return prev.filter(x => x.id !== id); })}
    )

    return (
        <div className="space-y-6">
            <FiltersPanel
                values={values}
                inlineFilter={filterFields}
                searchPlaceholder={"Пошук за ім'ям та прізвищем працівника"}
                actionButton={<AddButton onClick={() => setIsModalOpen(true)} title="Додати співробітника" />}
                setValues={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
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
                onChange={onChange}
            />

            <FormModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title="Додати працівника"
                description="Внесіть інформацію про нового працівника"
                submit={onCreate}
                fields={modalFields}
                errors={error ? [error] : []}
                submitText="Додати"
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
export { errorMessages };