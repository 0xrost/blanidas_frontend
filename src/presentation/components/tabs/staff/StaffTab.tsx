import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import {Package, Plus, Shield, Wrench} from "lucide-react";
import {useStaffSummary} from "@/presentation/hooks/summary.ts";
import FiltersPanel, {type FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {Role} from "@/domain/auth/roles.ts";
import StaffTable from "@/presentation/components/tabs/staff/StaffTable.tsx";
import {useCreateUser, useDeleteUser, useUpdateUser, useUsers} from "@/presentation/hooks/entities/user.ts";
import {UnlimitedPagination} from "@/domain/pagination.ts";
import {useAuthSession} from "@/presentation/hooks/auth.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {composeMutationOptions} from "@/presentation/utils.ts";
import type {User} from "@/domain/entities/user.ts";
import {useInstitutions} from "@/presentation/hooks/entities/institution.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";
import type {UserUpdate} from "@/domain/models/user.ts";
import PaginationControl from "@/presentation/components/layouts/pagination/PaginationControl.tsx";
import {memberFields, type MemberFormData} from "@/presentation/components/tabs/staff/memberModal.ts";
import FormModal from "@/presentation/components/layouts/FormModal.tsx";

const inlineFilter = {
    key: 'role',
    options: [
        { value: 'all', label: 'Усі ролі' },
        { value: 'engineer', label: "Інженер" },
        { value: "manager", label: "Менеджер" },
    ],
};

const emptyMember: MemberFormData = {
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
};

interface SearchParams extends FiltersPanelValues { role: Role | "all"; }

interface Props {
    page: number;
    limit: number;
    url: string;
}
const StaffTab = ({ page, limit, url }: Props) => {
    const [values, setValues] = useState<SearchParams>({search: "", role: "all", sortOrder: "asc"});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [localStaff, setLocalStaff] = useState<User[]>([]);

    const pagination = useMemo(() => ({page: page, limit: limit}), [page, limit]);

    const authSession = useAuthSession();

    const createMember = useCreateUser();
    const updateMember = useUpdateUser();
    const deleteMember = useDeleteUser();


    const {data: summary} = useStaffSummary();
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
        return memberFields(institutionsPagination?.items ?? [], true);
    }, [institutionsPagination]);

    useEffect(() => {
        if (staffPagination === undefined) return;
        setLocalStaff(staffPagination.items);
    }, [staffPagination]);

    const onCreate = useCallback(
        (data: MemberFormData, options?: MutationOptions<User>) => {
            createMember.mutate({
                role: data.role,
                phone: data.phone,
                email: data.email,
                hireAt: data.hireAt,
                department: data.department,
                workplaceId: data.workplaceId,
                password: data.password.trim(),
                username: data.firstName + " " + data.lastName,
                receiveLowStockNotification: data.receiveLowStockNotification,
                receiveRepairRequestCreatedNotification: data.receiveRepairRequestCreatedNotification,
            }, composeMutationOptions({
                onSuccess: (data) => {
                    setLocalStaff(prev => [data, ...prev]);
                }
            }, options));
        }, [createMember]
    );

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

    const onDelete = useCallback(
        (id: string, options?: MutationOptions) => {
            deleteMember.mutate(id, composeMutationOptions({
                onSuccess: () => {
                    setLocalStaff(prev => {
                        return prev.filter(x => x.id !== id);
                    })
                }
            }, options));
        }, [deleteMember]
    )

    const createButton = (
        <Button
            onClick={() => setIsModalOpen(true)}
            className="px-4! h-12 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200">
            <Plus className="w-8 h-8" />
            Додати співробітника
        </Button>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <DashboardCard label="Всього" value={summary?.total ?? 0} color="slate" icon={Package} />
                <DashboardCard label="Інженери" value={summary?.engineers ?? 0} color="blue" icon={Wrench} />
                <DashboardCard label="Менеджери" value={summary?.managers ?? 0} color="purple" icon={Shield} />
            </div>
            <FiltersPanel
                values={values}
                inlineFilter={inlineFilter}
                actionButton={createButton}
                setValues={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
            />

            <StaffTable
                staff={localStaff}
                deleteMember={onDelete}
                updateMember={onUpdate}
                current={authSession?.currentUser ?? null}
                institutions={institutionsPagination?.items ?? []}
            />

            <PaginationControl
                url={url}
                items={staffPagination?.total ?? 0}
                pagination={pagination}
            />

            <FormModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title="Додати працівника"
                description="Внесіть інформацію про нового працівника"
                initialValues={emptyMember}
                submit={onCreate}
                fields={modalFields}
                errorText="Не вдалося додати нового працівника"
                submitText="Додати"
            />
        </div>
    );
};

export default StaffTab;