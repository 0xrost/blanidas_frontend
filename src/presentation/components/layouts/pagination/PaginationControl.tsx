import { Card } from "@/presentation/components/ui/card";
import { ChevronRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/presentation/components/ui/select";
import {PageButton} from "@/presentation/components/layouts/pagination/PageButton.tsx";
import type {Pagination} from "@/domain/pagination.ts";

type PaginationControlProps = {
    items: number;
    pagination: Pagination;
    onChange: (pagination: Pagination) => void;
};

const VISIBLE_PAGES = 2;
const limitOptions = [10, 15, 20, 50];

const PaginationControl = ({ items, pagination, onChange }: PaginationControlProps) => {
    const { page, limit } = pagination;

    const totalPages = Math.max(1, Math.ceil(items / limit));

    const startItem = items === 0 ? 0 : (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, items);

    const startPage = Math.max(1, page - VISIBLE_PAGES);
    const endPage = Math.min(totalPages, page + VISIBLE_PAGES);

    const hasLeftEllipsis = startPage > 2;
    const hasRightEllipsis = endPage < totalPages - 1;

    console.log(pagination);
    return (
        <Card className="mt-6 bg-white border-slate-200">
            <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-600">
                    Показано{" "}
                    <span className="text-slate-900">
                        {startItem}–{endItem}
                    </span>{" "}
                    з <span className="text-slate-900">{items}</span> записів
                </div>

                <div className="flex items-center gap-2">
                    <PageButton
                        disabled={page === 1}
                        onClick={() => onChange({ page: pagination.page - 1, limit: pagination.limit })}
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        <span className="hidden sm:inline ml-1">Попередня</span>
                    </PageButton>

                    {hasLeftEllipsis && (
                        <>
                            <PageButton
                                children={1}
                                selected={false}
                                onClick={() => onChange({ page: 1, limit: pagination.limit })}
                            />
                            <span className="px-2 text-slate-400">…</span>
                        </>
                    )}

                    {Array.from(
                        { length: endPage - startPage + 1 },
                        (_, i) => startPage + i
                    ).map(page => (
                        <PageButton
                            key={page}
                            children={page}
                            onClick={() => onChange({ page: page, limit: pagination.limit })}
                            selected={page === pagination.page}
                        />
                    ))}

                    {hasRightEllipsis && (
                        <>
                            <span className="px-2 text-slate-400">…</span>
                            <PageButton
                                children={totalPages}
                                disabled={page === totalPages}
                                onClick={() => onChange({ page: totalPages, limit: pagination.limit })}
                            />
                        </>
                    )}

                    <PageButton
                        disabled={page === totalPages}
                        onClick={() => onChange({ page: totalPages, limit: pagination.limit })}
                    >
                        <span className="hidden sm:inline mr-1">Наступна</span>
                        <ChevronRight className="w-4 h-4" />
                    </PageButton>
                </div>

                <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600">
                    <span>На сторінці:</span>
                    <Select
                        value={pagination.limit.toString()}
                        onValueChange={value => onChange({page: 1, limit: +value})}
                    >
                        <SelectTrigger className="w-20 h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {limitOptions.map(option => (
                                <SelectItem key={option} value={option.toString()}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Card>
    );
};

export default PaginationControl;
