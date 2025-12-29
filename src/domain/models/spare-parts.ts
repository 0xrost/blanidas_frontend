interface LocationCreate {
    quantity: number;
    institutionId: string;
}

interface SparePartUpdate {
    id: string;
    name?: string;
    minQuantity?: number;
    compatibleModelsIds?: number[];
    note?: string;

    locations?: LocationCreate[];
    supplierId?: number;
    manufacturerId?: number;
    sparePartCategoryId?: number;
}

export type {
    SparePartUpdate,
    LocationCreate,
};