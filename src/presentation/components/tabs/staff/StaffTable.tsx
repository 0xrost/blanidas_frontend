import { Card } from "@/presentation/components/ui/card.tsx";
import type { User } from "@/domain/entities/user.ts";
import StaffTableRow from "@/presentation/components/tabs/staff/StaffTableRow.tsx";
import type { Institution } from "@/domain/entities/institution.ts";
import type { MutationOptions } from "@/presentation/models.ts";
import type { UserUpdate } from "@/domain/models/user.ts";

interface Props {
    staff: User[];
    current: User | null;
    institutions: Institution[];
    updateMember: (data: UserUpdate, options?: MutationOptions) => void;
    deleteMember: (id: string) => void;
}

const StaffTable = ({ staff, current, institutions, updateMember, deleteMember }: Props) => {
    return (
        <Card className="bg-white border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                            Працівник
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                            Роль
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                            Відділ
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                            Контакти
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                            Дата прийняття
                        </th>
                        <th className="px-6 py-3 text-right text-xs text-slate-600 uppercase tracking-wider">
                            Дії
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                    {current && (
                        <>
                            <StaffTableRow
                                member={current}
                                institutions={institutions}
                                update={updateMember}
                                delete_={undefined}
                            />
                            <tr>
                                <td colSpan={6} className="h-4 bg-slate-100" />
                            </tr>
                        </>
                    )}
                    {staff.map((member) => (
                        <StaffTableRow
                            key={member.id}
                            member={member}
                            institutions={institutions}
                            update={updateMember}
                            delete_={deleteMember}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default StaffTable;
