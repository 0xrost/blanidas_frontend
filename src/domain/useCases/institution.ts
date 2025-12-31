import type {InstitutionRepository} from "@/domain/repositories/institution.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import {InvalidLimitError, InvalidPageNumberError} from "@/domain/errors.ts";
import type {Institution} from "@/domain/entities/institution.ts";

const listInstitutionsUseCase =
    (repo: InstitutionRepository) =>
        async (pagination: Pagination): Promise<PaginationResponse<Institution>> => {
            if (pagination.page < 1) throw new InvalidPageNumberError(pagination.page);
            if (pagination.limit < 1 && pagination.limit !== -1) throw new InvalidLimitError(pagination.limit)
            return await repo.list(pagination);
        }

export { listInstitutionsUseCase };