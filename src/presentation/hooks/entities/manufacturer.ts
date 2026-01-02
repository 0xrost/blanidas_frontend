import {ManufacturerRepository} from "@/dependencies.ts";
import {
    createManufacturerUseCase, deleteManufacturerUseCase,
    listManufacturersUseCase,
    updateManufacturerUseCase
} from "@/domain/useCases/manufacturers.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";

const manufacturerHooks = createCrudHooks(
    "manufacturer",
    listManufacturersUseCase(ManufacturerRepository),
    createManufacturerUseCase(ManufacturerRepository),
    updateManufacturerUseCase(ManufacturerRepository),
    deleteManufacturerUseCase(ManufacturerRepository)
);

const useManufacturers = manufacturerHooks.useList;
const useCreateManufacturer = manufacturerHooks.useCreate;
const useUpdateManufacturer = manufacturerHooks.useUpdate;
const useDeleteManufacturer = manufacturerHooks.useDelete;

export {
    useManufacturers,
    useCreateManufacturer,
    useUpdateManufacturer,
    useDeleteManufacturer,
};