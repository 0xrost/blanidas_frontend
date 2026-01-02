interface SupplierCreate {
    name: string;
    contactPhone: string
    contactEmail: string
}

interface SupplierUpdate {
    id: string
    name?: string | null
    contactPhone?: string | null
    contactEmail?: string | null
}

export type {
    SupplierUpdate,
    SupplierCreate,
}