interface SparePartCategoryCreate {
    name: string;
}

interface SparePartCategoryUpdate {
    id: string
    name?: string | null
}

export type {
    SparePartCategoryUpdate,
    SparePartCategoryCreate,
}