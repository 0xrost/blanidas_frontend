interface SupplierCreate {
    name: string;
}

interface SupplierUpdate {
    id: string
    name?: string | null
}

export type {
    SupplierUpdate,
    SupplierCreate,
}