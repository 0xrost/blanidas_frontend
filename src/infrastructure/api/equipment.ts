import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapEquipmentDtoToDomain} from "@/infrastructure/mappers/equipment.ts";
import type {Equipment} from "@/domain/entities/equipment.ts";

class EquipmentRepository implements EquipmentRepository {
    async findById(id: string): Promise<Equipment> {
        const response = await fetch(Endpoints.equipment.get(id));
        return mapEquipmentDtoToDomain(await response.json());
    }
}

export { EquipmentRepository };