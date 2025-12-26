import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapApiEquipment} from "@/infrastructure/mappers/equipment.ts";
import type {Equipment} from "@/domain/entities/equipment.ts";

class EquipmentRepository implements EquipmentRepository {
    async findById(id: string): Promise<Equipment> {
        const response = await fetch(Endpoints.equipment.get(id));
        return mapApiEquipment(await response.json());
    }
}

export { EquipmentRepository };