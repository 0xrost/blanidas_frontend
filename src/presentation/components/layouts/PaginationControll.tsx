import {Card} from "@/presentation/components/ui/card.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {ChevronRight} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import type {Pagination} from "@/domain/models/pagination.ts";

type PaginationControlButtonProps = {
    changePage: (page: number) => void,
    isSelected: boolean,
    page: number,
}
const PaginationControlButton = ({ isSelected, page, changePage }: PaginationControlButtonProps) => {
    const styles = isSelected
        ? "bg-cyan-500 text-white border-cyan-500 hover:bg-cyan-600"
        : "text-slate-600 border-slate-300 hover:bg-slate-50";

    return (
        <Button onClick={() => changePage(page)} size="sm" variant="outline" className={`w-9 h-9 p-0 ${styles}`}>
            {page}
        </Button>
    );
};
type PaginationControlProps = {
    items: number;
    pagination: Pagination,
    changePagination: (value: Pagination) => void,
}

const PaginationControll = ({ items, pagination, changePagination }: PaginationControlProps) => {
    const visiblePagesBeforeEllipsis = 2;

    const pages = Math.ceil(items / pagination.limit);
    const onPageChange = (page: number): void => changePagination({ ...pagination, page: page });
    const onLimitChange = (limit: number): void => changePagination({ ...pagination, limit: limit });

    const startFrom = (pagination.page - 1) * pagination.limit;
    const endAt = Math.min((pagination.page) * pagination.limit, items);

    return (
        <Card className="py-0 bg-white border-slate-200 mt-6">
            <div className="p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-600">
                        Показано <span className="text-slate-900">{startFrom}-{endAt}</span> з <span className="text-slate-900">{items}</span> записів
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => onPageChange(pagination.page - 1)}
                            variant="outline"
                            size="sm"
                            className="text-slate-600 border-slate-300 hover:bg-slate-50"
                            disabled={pagination.page === 1}
                        >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                            <span className="hidden sm:inline ml-1">Попередня</span>
                        </Button>
                        {
                            (pagination.page - visiblePagesBeforeEllipsis > 1) &&
                            <>
                                <PaginationControlButton page={1} isSelected={false} changePage={onPageChange} />
                                <span className="text-slate-400 px-2">...</span>
                            </>
                        }
                        {
                            Array.from({ length: pages }, (_, i) => i + 1)
                            .filter(p => p >= pagination.page - visiblePagesBeforeEllipsis && p <= pagination.page + visiblePagesBeforeEllipsis)
                            .map(page => (
                                <PaginationControlButton
                                    key={page}
                                    isSelected={pagination.page === page}
                                    changePage={onPageChange}
                                    page={page}
                                />
                            ))
                        }
                        {
                            (pagination.page + visiblePagesBeforeEllipsis < pages) &&
                            <>
                                <span className="text-slate-400 px-2">...</span>
                                <PaginationControlButton isSelected={false} page={pages} changePage={onPageChange} />
                            </>
                        }
                        <Button
                            onClick={() => onPageChange(pagination.page + 1)}
                            variant="outline"
                            size="sm"
                            className="text-slate-600 border-slate-300 hover:bg-slate-50"
                            disabled={pagination.page === pages}
                        >
                            <span className="hidden sm:inline mr-1">Наступна</span>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600">
                        <span>На сторінці:</span>
                        <Select onValueChange={(value) => onLimitChange(+value)} value={pagination.limit.toString()}>
                            <SelectTrigger className="w-20 h-9">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default PaginationControll;