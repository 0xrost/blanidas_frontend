import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {ManufacturerCreate, ManufacturerUpdate} from "@/domain/models/manufacturer.ts";
import type {ManufacturerFilters, ManufacturerSortBy} from "@/domain/queries/manufacturer-list.query.ts";
import type {ManufacturerRepository} from "@/domain/repositories/manufacturers.ts";

const ManufacturerUseCases = createCrudUseCases<
    Manufacturer,
    ManufacturerCreate,
    ManufacturerUpdate,
    ManufacturerFilters,
    ManufacturerSortBy,
    ManufacturerRepository
>();

export const {
    list: listManufacturersUseCase,
    create: createManufacturerUseCase,
    update: updateManufacturerUseCase,
    delete: deleteManufacturerUseCase
} = ManufacturerUseCases;