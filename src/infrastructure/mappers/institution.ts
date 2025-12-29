import type {Institution} from "@/domain/entities/institution.ts";
import type {InstitutionDto} from "@/infrastructure/dto/institution.ts";

const mapInstitutionDtoToDomain = (dto: InstitutionDto): Institution =>  {
    return {
        id: dto.id,
        name: dto.name,
        address: dto.address,
        contactEmail: dto.contact_email,
        contactPhone: dto.contact_phone,
        institutionType: dto.institution_type,
    };
};

export { mapInstitutionDtoToDomain };