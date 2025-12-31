import type {Pagination} from "@/domain/models/pagination.ts";
import {Link} from "@tanstack/react-router";
import {Button} from "@/presentation/components/ui/button.tsx";

interface Props {
    url: string;
    selected: boolean;
    disabled: boolean;
    pagination: Pagination;

    size?: "sm" | "lg";
    className?: string;

}

const PaginationControlButton = ({ selected, disabled, pagination, url, size, className }: Props) => {
    const styles = selected
        ? "bg-cyan-500 text-white border-cyan-500 hover:bg-cyan-600"
        : "text-slate-600 border-slate-300 hover:bg-slate-50";

    return (
        <Link disabled={disabled} to={url} search={{page: pagination.page, limit: pagination.limit}}>
            <Button size={size} variant="outline" className={`${className} w-9 h-9 p-0 ${styles}`}>
                {pagination.page}
            </Button>
        </Link>
    );
};