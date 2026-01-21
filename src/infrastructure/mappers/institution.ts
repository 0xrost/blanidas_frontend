import type {Institution} from "@/domain/entities/institution.ts";
import type {InstitutionCreateDto, InstitutionDto, InstitutionUpdateDto} from "@/infrastructure/dto/institution.ts";
import type {InstitutionCreate, InstitutionUpdate} from "@/domain/models/institution.ts";

const mapInstitutionDtoToDomain = (dto: InstitutionDto): Institution =>  {
    return {
        id: dto.id,
        name: dto.name,
        address: dto.address,
        contactEmail: dto.contact_email,
        contactPhone: dto.contact_phone,
    };
};

const mapInstitutionCreateDomainToDto = (domain: InstitutionCreate): InstitutionCreateDto =>  {
    return {
        name: domain.name,
        address: domain.address,
        contact_email: domain.contactEmail,
        contact_phone: domain.contactPhone,
    };
};

const mapInstitutionUpdateDomainToDto = (domain: InstitutionUpdate): InstitutionUpdateDto =>  {
    return {
        id: domain.id,
        name: domain.name,
        address: domain.address,
        contact_email: domain.contactEmail,
        contact_phone: domain.contactPhone,
    };
};

export {
    mapInstitutionDtoToDomain,
    mapInstitutionCreateDomainToDto,
    mapInstitutionUpdateDomainToDto,
};