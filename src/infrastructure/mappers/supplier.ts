import type {SupplierCreateDto, SupplierDto, SupplierUpdateDto} from "@/infrastructure/dto/supplier.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {SupplierCreate, SupplierUpdate} from "@/domain/models/supplier.ts";

const mapSupplierDtoToDomain = (dto: SupplierDto): Supplier => {
    return {
        id: dto.id,
        name: dto.name,
        contactPhone: dto.contact_phone,
        contactEmail: dto.contact_email,
    };
};

const mapSupplierCreateDomainToDto = (domain: SupplierCreate): SupplierCreateDto => {
    return {
        name: domain.name,
        contact_phone: domain.contactPhone,
        contact_email: domain.contactEmail,
    };
};

const mapSupplierUpdateDomainToDto = (domain: SupplierUpdate): SupplierUpdateDto => {
    return {
        id: domain.id,
        name: domain.name,
        contact_phone: domain.contactPhone,
        contact_email: domain.contactEmail,
    };
};

export {
    mapSupplierDtoToDomain,
    mapSupplierCreateDomainToDto,
    mapSupplierUpdateDomainToDto,
};