import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";
import {InstitutionTypeRepository} from "@/dependencies.ts";
import {
    createInstitutionTypeUseCase, deleteInstitutionTypeUseCase,
    listInstitutionTypeUseCase,
    updateInstitutionTypeUseCase
} from "@/domain/useCases/institution-type.ts";

const institutionTypesHooks = createCrudHooks(
    'institution-type',
    listInstitutionTypeUseCase(InstitutionTypeRepository),
    createInstitutionTypeUseCase(InstitutionTypeRepository),
    updateInstitutionTypeUseCase(InstitutionTypeRepository),
    deleteInstitutionTypeUseCase(InstitutionTypeRepository)
);

const useInstitutionTypes = institutionTypesHooks.useList;
const useCreateInstitutionType = institutionTypesHooks.useCreate;
const useUpdateInstitutionType = institutionTypesHooks.useUpdate;
const useDeleteInstitutionType = institutionTypesHooks.useDelete;

export {
    useInstitutionTypes,
    useCreateInstitutionType,
    useUpdateInstitutionType,
    useDeleteInstitutionType,
};