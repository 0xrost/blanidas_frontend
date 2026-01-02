import {InstitutionRepository} from "@/dependencies.ts";
import {
    createInstitutionUseCase, deleteInstitutionUseCase,
    listInstitutionsUseCase,
    updateInstitutionUseCase
} from "@/domain/useCases/institution.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";

const institutionHooks = createCrudHooks(
    "institution",
    listInstitutionsUseCase(InstitutionRepository),
    createInstitutionUseCase(InstitutionRepository),
    updateInstitutionUseCase(InstitutionRepository),
    deleteInstitutionUseCase(InstitutionRepository)
);

const useInstitutions = institutionHooks.useList;
const useCreateInstitution = institutionHooks.useCreate;
const useUpdateInstitution = institutionHooks.useUpdate;
const useDeleteInstitution = institutionHooks.useDelete;

export {
    useInstitutions,
    useCreateInstitution,
    useUpdateInstitution,
    useDeleteInstitution,
};