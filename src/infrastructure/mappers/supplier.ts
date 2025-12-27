import type {SupplierDTO} from "@/infrastructure/dto/supplier.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";

const mapSupplierDTOToDomain = (dto: SupplierDTO): Supplier => {
    return {
        id: dto.id,
        name: dto.name,
        contactPhone: dto.contact_phone,
        contactEmail: dto.contact_email,
    };
};

export { mapSupplierDTOToDomain };