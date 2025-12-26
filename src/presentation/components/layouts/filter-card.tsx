import {Card} from "@/presentation/components/ui/card.tsx";
import {Search} from "lucide-react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";

type SelectOption = {
    label: string;
    value: string;
};

type FilterConfig = {
    key: string;
    placeholder: string;
    options: SelectOption[];
};


interface FilterCardProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;

    filters: FilterConfig[];
    values: Record<string, string>;
    onChange: (key: string, value: string) => void;
}

const FilterCard = ({
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Пошук',
    filters,
    values,
    onChange,
}: FilterCardProps) => {
    return (
        <Card className="py-0 bg-white border-slate-200 mb-6">
            <div className="p-6 space-y-4">
                {onSearchChange && (
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="pl-10 h-12 bg-slate-100"
                        />
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {filters.map((filter) => (
                        <div>
                            <Select
                                key={filter.key}
                                value={values[filter.key]}
                                onValueChange={(value) => onChange(filter.key, value)}
                            >
                                <SelectTrigger  className="bg-slate-100 w-full">
                                    <SelectValue placeholder={filter.placeholder} />
                                </SelectTrigger>

                                <SelectContent>
                                    {filter.options.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default FilterCard;
export type { FilterConfig, SelectOption };
