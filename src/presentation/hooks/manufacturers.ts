import type {Pagination} from "@/domain/models/pagination.ts";
import {useQuery} from "@tanstack/react-query";
import {ManufacturersRepository} from "@/dependencies.ts";
import type {ManufacturersFilters, ManufacturersSorting} from "@/domain/query/manufacturer.query.ts";
import {listManufacturersUseCase} from "@/domain/useCases/manufacturers.ts";

const useManufacturers = (pagination: Pagination, filters: ManufacturersFilters, sorting: ManufacturersSorting) => {
    return useQuery({
        queryKey: ['manufacturers', pagination, filters, sorting],
        queryFn: () => listManufacturersUseCase(ManufacturersRepository)(pagination, filters, sorting),
    });
};

export { useManufacturers };