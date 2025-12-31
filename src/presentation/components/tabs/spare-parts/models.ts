import type {Institution} from "@/domain/entities/institution.ts";

interface UILocation {
    institution: Institution;
    quantity: number;
}

export type { UILocation };