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

export type {
    RepairRequestsSummary,
    SparePartsSummary,
};