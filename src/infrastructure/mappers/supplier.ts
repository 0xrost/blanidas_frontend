import type {SupplierDto} from "@/infrastructure/dto/supplier.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";

const mapSupplierDtoToDomain = (dto: SupplierDto): Supplier => {
    return {
        id: dto.id,
        name: dto.name,
        contactPhone: dto.contact_phone,
        contactEmail: dto.contact_email,
    };
};

export { mapSupplierDtoToDomain };