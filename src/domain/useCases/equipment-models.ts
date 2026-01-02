import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {EquipmentModelCreate, EquipmentModelUpdate} from "@/domain/models/equipment-model.ts";
import type {EquipmentModelFilters, EquipmentModelSortBy} from "@/domain/queries/equipment-model-list.query.ts";
import type {EquipmentModelRepository} from "@/domain/repositories/equipment-models.ts";

const EquipmentModelUseCases = createCrudUseCases<
    EquipmentModel,
    EquipmentModelCreate,
    EquipmentModelUpdate,
    EquipmentModelFilters,
    EquipmentModelSortBy,
    EquipmentModelRepository
>();

export const {
    list: listEquipmentModelsUseCase,
    create: createEquipmentModelUseCase,
    update: updateEquipmentModelUseCase,
    delete: deleteEquipmentModelUseCase
} = EquipmentModelUseCases;