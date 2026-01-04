interface RepairRequestsSummary {
    new: number;
    inProgress: number;
    waitingSpareParts: number;
    finished: number;
}

interface SparePartsSummary {
    total: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
}

interface StaffSummary {
    total: number;
    engineers: number;
    managers: number;
}

interface InstitutionsSummary {
    total: number;
    equipment: number;
}

interface EquipmentSummary {
    total: number;
    working: number;
    underMaintenance: number;
    notWorking: number;
}

export type {
    RepairRequestsSummary,
    InstitutionsSummary,
    SparePartsSummary,
    StaffSummary,
    EquipmentSummary,
};