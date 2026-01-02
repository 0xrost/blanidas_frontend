import {EquipmentModelRepository} from "@/dependencies.ts";
import {
    createEquipmentModelUseCase, deleteEquipmentModelUseCase,
    listEquipmentModelsUseCase,
    updateEquipmentModelUseCase
} from "@/domain/useCases/equipment-models.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";

const equipmentModelHooks = createCrudHooks(
    'equipment-model',
    listEquipmentModelsUseCase(EquipmentModelRepository),
    createEquipmentModelUseCase(EquipmentModelRepository),
    updateEquipmentModelUseCase(EquipmentModelRepository),
    deleteEquipmentModelUseCase(EquipmentModelRepository)
);

const useEquipmentModels = equipmentModelHooks.useList;
const useCreateEquipmentModel = equipmentModelHooks.useCreate;
const useUpdateEquipmentModel = equipmentModelHooks.useUpdate;
const useDeleteEquipmentModel = equipmentModelHooks.useDelete;

export {
    useEquipmentModels,
    useCreateEquipmentModel,
    useUpdateEquipmentModel,
    useDeleteEquipmentModel,
};