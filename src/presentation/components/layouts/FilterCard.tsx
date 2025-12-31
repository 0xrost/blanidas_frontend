import {Card} from "@/presentation/components/ui/card.tsx";
import {Search, SortAsc, SortDesc} from "lucide-react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import type {SortOrder} from "@/domain/query/query.ts";
import type {ReactNode} from "react";

type SelectOption = {
    label: string;
    value: string;
};

type FilterConfig = {
    key: string;
    options: SelectOption[];
};

interface FilterCardValues {
    search: string;
    sortOrder: SortOrder;
    [key: string]: string;
}

interface FilterCardProps {
    searchPlaceholder?: string;
    filters: FilterConfig[];
    actionButton?: ReactNode;
    values: FilterCardValues;
    setValues: (key: string, value: string) => void;
}

const FilterCard = ({
    searchPlaceholder = 'Пошук',
    filters,
    actionButton,
    values,
    setValues,
}: FilterCardProps) => {
    const toggleSortOrder = () => {
        setValues("sortOrder", values.sortOrder === "desc" ? "asc" : "desc");
    };

    return (
        <Card className="py-0 bg-white border-slate-200 mb-6">
            <div className="p-6 space-y-4">
                <div className="flex flex-row items-center gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            value={values.search}
                            onChange={(e) => setValues("search", e.target.value)}
                            placeholder={searchPlaceholder}
                            className="pl-10 h-12 bg-slate-100"
                        />
                    </div>
                    <button
                        onClick={toggleSortOrder}
                        className="h-12 px-4 py-2 bg-slate-100 rounded-md text-slate-700 hover:bg-slate-200"
                    >
                        {values.sortOrder === "desc" ? <SortDesc /> : <SortAsc />}
                    </button>
                    { actionButton }
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {filters.map((filter) => (
                        <Select key={filter.key} value={values[filter.key]} onValueChange={(value) => setValues(filter.key, value)}>
                            <SelectTrigger className="bg-slate-100 w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {filter.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default FilterCard;
export type { FilterConfig, SelectOption, FilterCardValues };
