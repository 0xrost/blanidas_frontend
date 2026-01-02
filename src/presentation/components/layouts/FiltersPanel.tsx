import { Card } from "@/presentation/components/ui/card.tsx";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Input } from "@/presentation/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select.tsx";
import type { SortOrder } from "@/domain/queries/queries.ts";
import { type ReactNode, useLayoutEffect, useState, useRef } from "react";

export type SelectOption = {
    label: string;
    value: string;
};

export type FilterConfig = {
    key: string;
    options: SelectOption[];
};

export interface FiltersPanelValues {
    search: string;
    sortOrder: SortOrder;
    [key: string]: string;
}

interface Props {
    inlineFilter?: FilterConfig;
    actionButton?: ReactNode;
    searchPlaceholder?: string;
    filters?: FilterConfig[];
    values: FiltersPanelValues;
    setValues: (key: string, value: string) => void;
}

const FiltersPanel = ({
    searchPlaceholder = 'Пошук',
    filters,
    inlineFilter,
    actionButton,
    values,
    setValues,
}: Props) => {

    const toggleSortOrder = () => {
        setValues("sortOrder", values.sortOrder === "desc" ? "asc" : "desc");
    };

    const renderSelect = (filter: FilterConfig, className?: string) => (
        <Select
            key={filter.key}
            value={values[filter.key]}
            onValueChange={(value) => setValues(filter.key, value)}
        >
            <SelectTrigger className={`bg-slate-100 ${className}`}>
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
    );

    return (
        <Card className="bg-white border border-slate-200 mb-6">
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

                    {inlineFilter && renderSelect(inlineFilter, "h-12!")}

                    <button
                        onClick={toggleSortOrder}
                        className="h-12 px-4 py-2 bg-slate-100 rounded-md text-slate-700 hover:bg-slate-200"
                        aria-label="Toggle sort order"
                    >
                        {values.sortOrder === "desc" ? <SortDesc /> : <SortAsc />}
                    </button>

                    {actionButton}
                </div>

                {filters && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {filters.map(filter => renderSelect(filter, "w-full"))}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default FiltersPanel;
