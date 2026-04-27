import type {Institution} from "@/domain/entities/institution.ts";

interface UILocation {
    institution: Institution;
    quantity: number;
    restoredQuantity: number;
}

export type { UILocation };