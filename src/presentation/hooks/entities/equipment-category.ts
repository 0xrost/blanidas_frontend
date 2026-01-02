import {EquipmentCategoryRepository} from "@/dependencies.ts";
import {
    createEquipmentCategoryUseCase,
    deleteEquipmentCategoryUseCase,
    listEquipmentCategoriesUseCase,
    updateEquipmentCategoryUseCase
} from "@/domain/useCases/equipment-category.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";


const equipmentCategoryHooks = createCrudHooks(
    'equipment-category',
    listEquipmentCategoriesUseCase(EquipmentCategoryRepository),
    createEquipmentCategoryUseCase(EquipmentCategoryRepository),
    updateEquipmentCategoryUseCase(EquipmentCategoryRepository),
    deleteEquipmentCategoryUseCase(EquipmentCategoryRepository)
);

const useEquipmentCategories = equipmentCategoryHooks.useList;
const useCreateEquipmentCategory = equipmentCategoryHooks.useCreate;
const useUpdateEquipmentCategory = equipmentCategoryHooks.useUpdate;
const useDeleteEquipmentCategory = equipmentCategoryHooks.useDelete;

export {
    useEquipmentCategories,
    useCreateEquipmentCategory,
    useUpdateEquipmentCategory,
    useDeleteEquipmentCategory,
};