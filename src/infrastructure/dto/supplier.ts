interface SupplierDto {
    id: string;
    name: string;
    contact_phone: string;
    contact_email: string;
}

interface SupplierCreateDto {
    name: string;
    contact_phone: string
    contact_email: string
}

interface SupplierUpdateDto {
    id: string
    name?: string | null
    contact_phone?: string | null
    contact_email?: string | null
}

export type {
    SupplierDto,
    SupplierCreateDto,
    SupplierUpdateDto,
};