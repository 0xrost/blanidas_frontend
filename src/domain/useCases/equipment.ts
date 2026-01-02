import type {EquipmentRepository} from "@/domain/repositories/equipment.ts";
import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {Equipment} from "@/domain/entities/equipment.ts";
import type {EquipmentCreate, EquipmentUpdate} from "@/domain/models/equipment.ts";
import type {EquipmentFilters, EquipmentSortBy} from "@/domain/queries/equipment-list.query.ts";

const getEquipmentUseCase = (repo: EquipmentRepository) => {
    return async (id: string) => await repo.get(id);
}

const EquipmentUseCases = createCrudUseCases<
    Equipment,
    EquipmentCreate,
    EquipmentUpdate,
    EquipmentFilters,
    EquipmentSortBy,
    EquipmentRepository
>();

export const {
    list: listEquipmentUseCase,
    create: createEquipmentUseCase,
    update: updateEquipmentUseCase,
    delete: deleteEquipmentUseCase
} = EquipmentUseCases;

export { getEquipmentUseCase };