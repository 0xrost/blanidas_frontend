import type {Pagination} from "@/domain/models/pagination.ts";
import {useQuery} from "@tanstack/react-query";
import {SparePartCategoriesRepository} from "@/dependencies.ts";
import type {SparePartCategoriesSorting} from "@/domain/query/spare-part-categories.query.ts";
import {listSparePartCategoriesUseCase} from "@/domain/useCases/spare-part-categories.ts";

const useSparePartCategories = (pagination: Pagination, sorting: SparePartCategoriesSorting) => {
    return useQuery({
        queryKey: ['institutions', pagination, sorting],
        queryFn: () => listSparePartCategoriesUseCase(SparePartCategoriesRepository)(pagination, sorting),
    });
};

export { useSparePartCategories };