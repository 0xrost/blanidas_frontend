type DomainToDtoMapper<TDomain, TDto> = (domain: TDomain) => TDto;
type DtoToDomainMapper<TDto, TDomain> = (dto: TDto) => TDomain;

function emptyDomainToDtoMapper<TDomain extends TDto, TDto>(domain: TDomain): TDto { return domain as TDto; }
function emptyDtoToDomainMapper<TDto extends TDomain, TDomain>(dto: TDto): TDomain { return dto as TDomain; }

export type { DomainToDtoMapper, DtoToDomainMapper }
export { emptyDomainToDtoMapper, emptyDtoToDomainMapper };