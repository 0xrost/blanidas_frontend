import type {Pagination} from "@/domain/models/pagination.ts";
import type {SparePartCategoriesSorting} from "@/domain/query/spare-part-categories.query.ts";
import {useQuery} from "@tanstack/react-query";
import {listSuppliersUseCase} from "@/domain/useCases/suppliers.ts";
import {SuppliersRepository} from "@/dependencies.ts";

const useSuppliers = (pagination: Pagination, sorting: SparePartCategoriesSorting) => {
    return useQuery({
        queryKey: ['suppliers', pagination, sorting],
        queryFn: () => listSuppliersUseCase(SuppliersRepository)(pagination, sorting),
    });
};

export { useSuppliers };
