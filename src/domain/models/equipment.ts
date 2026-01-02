interface EquipmentCreate {
    location: string;
    serialNumber: string;
    installed: Date;
    modelId: string;
    institutionId: string;
    categoryId: string;
    manufacturerId: string;
}

interface EquipmentUpdate {
    location?: string | null;
    serialNumber?: string | null;
    installed?: Date | null;
    modelId?: string | null;
    institutionId?: string | null;
    categoryId?: string | null;
    manufacturerId?: string | null;
}

export type { EquipmentUpdate, EquipmentCreate };