import {
    createSparePartUseCase,
    deleteSparePartUseCase,
    listSparePartsUseCase,
    updateSparePartUseCase
} from "@/domain/useCases/spare-part.ts";
import {SparePartRepository} from "@/dependencies.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";

const sparePartHooks = createCrudHooks(
    "spare-part",
    listSparePartsUseCase(SparePartRepository),
    createSparePartUseCase(SparePartRepository),
    updateSparePartUseCase(SparePartRepository),
    deleteSparePartUseCase(SparePartRepository)
);

const useSpareParts = sparePartHooks.useList;
const useCreateSparePart = sparePartHooks.useCreate;
const useUpdateSparePart = sparePartHooks.useUpdate;
const useDeleteSparePart = sparePartHooks.useDelete;

export {
    useSpareParts,
    useCreateSparePart,
    useUpdateSparePart,
    useDeleteSparePart,
};