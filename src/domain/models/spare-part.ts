interface LocationCreate {
    quantity: number;
    restoredQuantity: number;
    institutionId: string;
}

interface SparePartUpdate {
    id: string;
    name?: string | null;
    minQuantity?: number | null;
    compatibleModelIds?: string[] | null;

    locations?: LocationCreate[] | null;
    sparePartCategoryId?: string | null;
}

interface SparePartCreate {
    name: string;
    minQuantity: number;
    compatibleModelIds: string[];
    sparePartCategoryId: string;
}

export type {
    SparePartUpdate,
    LocationCreate,
    SparePartCreate,
};