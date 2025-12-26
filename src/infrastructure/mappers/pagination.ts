import type {PaginationResponse} from "@/domain/models/pagination.ts";
import type {PaginationResponseDTO} from "@/infrastructure/dto/pagination.ts";

function mapPaginationResponseDTOToDomain<T>(dto: PaginationResponseDTO<T>, itemMapper: (value: unknown) => T): PaginationResponse<T> {
    const { has_prev, has_next, ...rest } = dto;
    return {
        ...rest,
        hasNext: has_next,
        hasPrev: has_prev,
        items: dto.items.map((item) => itemMapper(item))
    }
}

export { mapPaginationResponseDTOToDomain };