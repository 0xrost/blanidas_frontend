interface EquipmentCategoryCreate {
    name: string;
}

interface EquipmentCategoryUpdate {
    id: string
    name?: string | null
}

export type {
    EquipmentCategoryUpdate,
    EquipmentCategoryCreate,
}