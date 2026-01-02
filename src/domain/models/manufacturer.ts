interface ManufacturerCreate {
    name: string;
}

interface ManufacturerUpdate {
    id: string
    name?: string | null
}

export type {
    ManufacturerUpdate,
    ManufacturerCreate,
}