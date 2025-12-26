import type {Institution} from "@/domain/entities/institution.ts";
import type {InstitutionDTO} from "@/infrastructure/dto/institution.ts";

const mapApiInstitution = (api: InstitutionDTO): Institution =>  {
    return {
        id: api.id,
        name: api.name,
        address: api.address,
        contactEmail: api.contact_email,
        contactPhone: api.contact_phone,
        institutionType: api.institution_type,
    };
};

export { mapApiInstitution };