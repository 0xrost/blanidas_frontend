interface EquipmentModelCreate {
    name: string;
}

interface EquipmentModelUpdate {
    id: string
    name?: string | null
}

export type {
    EquipmentModelUpdate,
    EquipmentModelCreate,
}