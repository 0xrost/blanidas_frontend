import type {Institution} from "@/domain/entities/institution.ts";

interface UILocation {
    institution: Institution;
    newQuantity: number;
    restoredQuantity: number;
}

export type { UILocation };