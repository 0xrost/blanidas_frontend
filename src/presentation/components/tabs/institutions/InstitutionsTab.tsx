import {useInstitutionsSummary} from "@/presentation/hooks/summary.ts";
import DashboardCard from "@/presentation/components/layouts/DashboardCard.tsx";
import {Building2, Monitor, Plus} from "lucide-react";
import FiltersPanel, {type FiltersPanelValues} from "@/presentation/components/layouts/FiltersPanel.tsx";
import type {Role} from "@/domain/auth/roles.ts";
import {useState} from "react";
import {Button} from "@/presentation/components/ui/button.tsx";
import {useInstitutionTypes} from "@/presentation/hooks/entities/institution-type.ts";
import {UnlimitedPagination} from "@/domain/pagination.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";

const inlineFilter = {
    key: 'type',
    options: [
        { value: 'all', label: 'Усі ролі' },
        { value: 'engineer', label: "Інженер" },
        { value: "manager", label: "Менеджер" },
    ],
};

interface SearchParams extends FiltersPanelValues { typeId: string | "all"; }


interface Props {
    page: number;
    limit: number;
    url: string;
}
const InstitutionsTab = ({ page, limit, url }: Props) => {
    const [values, setValues] = useState<SearchParams>({search: "", typeId: "all", sortOrder: "asc"});

    const {data: summary} = useInstitutionsSummary();
    const {data: typesPagination} = useInstitutionTypes({pagination: UnlimitedPagination, sorting: SortByNameAsc});

    console.log(typesPagination);
    const createButton = (
        <Button
            className="px-4! h-12 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200">
            <Plus className="w-8 h-8" />
            Додати заклад
        </Button>
    );

    return (
        <div className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <DashboardCard label="Всього закладів" value={summary?.total ?? 0} color="cyan" icon={Building2} />
               <DashboardCard label="Обладнання" value={summary?.equipment ?? 0} color="pink" icon={Monitor} />
           </div>

            <FiltersPanel
                values={values}
                inlineFilter={inlineFilter}
                actionButton={createButton}
                setValues={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
            />
        </div>
    );
};

export default InstitutionsTab;