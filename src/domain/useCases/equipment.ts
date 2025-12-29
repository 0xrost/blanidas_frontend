import type {EquipmentRepository} from "@/domain/repositories/equipment.ts";

const findEquipmentByIdUseCase =
    (repo: EquipmentRepository) =>
        async (id: string) => await repo.findById(id);

export { findEquipmentByIdUseCase };