import type {Equipment} from "@/domain/entities/equipment.ts";

interface EquipmentRepository {
    findById(id: string): Promise<Equipment>;
}

export type { EquipmentRepository };