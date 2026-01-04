import {
    createSparePartCategoryUseCase, deleteSparePartCategoryUseCase,
    listSparePartCategoriesUseCase, updateSparePartCategoryUseCase
} from "@/domain/useCases/spare-part-categories.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";
import {SparePartCategoryRepository} from "@/dependencies.ts";

const sparePartHooks = createCrudHooks(
    "spare-part-categories",
    listSparePartCategoriesUseCase(SparePartCategoryRepository),
    createSparePartCategoryUseCase(SparePartCategoryRepository),
    updateSparePartCategoryUseCase(SparePartCategoryRepository),
    deleteSparePartCategoryUseCase(SparePartCategoryRepository)
);

const useSparePartCategories = sparePartHooks.useList;
const useCreateSparePartCategory = sparePartHooks.useCreate;
const useUpdateSparePartCategory = sparePartHooks.useUpdate;
const useDeleteSparePartCategory = sparePartHooks.useDelete;

export {
    useSparePartCategories,
    useCreateSparePartCategory,
    useUpdateSparePartCategory,
    useDeleteSparePartCategory,
};