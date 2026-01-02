import {useNavigate} from "@tanstack/react-router";
import type {Pagination} from "@/domain/models/pagination.ts";

const usePaginationNavigate = (url: string) => {
    const navigate = useNavigate();
    return (pagination: Pagination) => {void navigate({ to: url, search: pagination })}
};

export { usePaginationNavigate };