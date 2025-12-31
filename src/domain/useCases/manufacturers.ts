import type {IManufacturersRepository} from "@/domain/repositories/manufacturers.ts";
import type {Pagination} from "@/domain/models/pagination.ts";
import type {ManufacturersFilters, ManufacturersSorting} from "@/domain/query/manufacturer.query.ts";

const listManufacturersUseCase =
    (repo: IManufacturersRepository) =>
        async (pagination: Pagination, filters: ManufacturersFilters, sorting: ManufacturersSorting) =>
            await repo.list(pagination, filters, sorting);

export { listManufacturersUseCase };