interface LocationCreate {
    quantity: number;
    institutionId: string;
}

interface SparePartUpdate {
    id: string;
    name?: string | null;
    minQuantity?: number | null;
    compatibleModelIds?: string[] | null;

    locations?: LocationCreate[] | null;
    supplierId?: string | null;
    sparePartCategoryId?: string | null;
}

interface SparePartCreate {
    name: string;
    minQuantity: number;
    compatibleModelIds: string[];
    supplierId: string;
    sparePartCategoryId: string;
}

export type {
    SparePartUpdate,
    LocationCreate,
    SparePartCreate,
};