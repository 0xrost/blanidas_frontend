import type {InstitutionRepository} from "@/domain/repositories/institution.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";

const listInstitution =
    (repo: InstitutionRepository) =>
        async (page: number, limit: number): Promise<EquipmentModel[]> => await repo.list(page, limit);

export { listInstitution };