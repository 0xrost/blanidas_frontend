import {FailureTypeRepository} from "@/dependencies.ts";
import {
    createFailureTypeUseCase, deleteFailureTypeUseCase,
    listFailureTypesUseCase,
    updateFailureTypeUseCase
} from "@/domain/useCases/failure-type.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";


const failureTypeHooks = createCrudHooks(
    'failure-type',
    listFailureTypesUseCase(FailureTypeRepository),
    createFailureTypeUseCase(FailureTypeRepository),
    updateFailureTypeUseCase(FailureTypeRepository),
    deleteFailureTypeUseCase(FailureTypeRepository)
);

const useFailureTypes = failureTypeHooks.useList;
const useCreateFailureType = failureTypeHooks.useCreate;
const useUpdateFailureType = failureTypeHooks.useUpdate;
const useDeleteFailureType = failureTypeHooks.useDelete;

export {
    useFailureTypes,
    useCreateFailureType,
    useUpdateFailureType,
    useDeleteFailureType,
};