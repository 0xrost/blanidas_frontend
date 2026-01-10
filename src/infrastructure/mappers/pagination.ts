import type {PaginationResponseDto} from "@/infrastructure/dto/pagination.ts";
import type {PaginationResponse} from "@/domain/pagination.ts";

function mapPaginationResponseDtoToDomain<TDomain, TDto>(dto: PaginationResponseDto<TDto>, itemMapper: (value: TDto) => TDomain): PaginationResponse<TDomain> {
    const { has_prev, has_next, ...rest } = dto;
    return {
        ...rest,
        hasNext: has_next,
        hasPrev: has_prev,
        items: dto.items.map((item: TDto) => itemMapper(item))
    }
}

export { mapPaginationResponseDtoToDomain };