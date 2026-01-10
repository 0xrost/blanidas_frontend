import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {SparePartCreate, SparePartUpdate} from "@/domain/models/spare-part.ts";
import type {SparePartFilters, SparePartSortBy} from "@/domain/queries/spare-part-list.query.ts";
import type {SparePartRepository} from "@/domain/repositories/spare-part.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";

const SparePartUseCases = createCrudUseCases<
    SparePart,
    SparePartCreate,
    SparePartUpdate,
    SparePartFilters,
    SparePartSortBy,
    SparePartRepository
>();

export const {
    list: listSparePartsUseCase,
    create: createSparePartUseCase,
    update: updateSparePartUseCase,
    delete: deleteSparePartUseCase
} = SparePartUseCases;