import {Endpoints} from "@/infrastructure/endpoints.ts";
import {
    mapEquipmentCreateDomainToDto,
    mapEquipmentDtoToDomain,
    mapEquipmentUpdateDomainToDto
} from "@/infrastructure/mappers/equipment.ts";
import type {Equipment} from "@/domain/entities/equipment.ts";
import type {EquipmentRepository as EquipmentRepositoryInterface} from "@/domain/repositories/equipment.ts";
import type {EquipmentFilters, EquipmentSortBy} from "@/domain/queries/equipment-list.query.ts";
import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import type {EquipmentCreateDto, EquipmentDto, EquipmentUpdateDto} from "@/infrastructure/dto/equipment.ts";
import type {EquipmentCreate, EquipmentUpdate} from "@/domain/models/equipment.ts";


const equipmentMappers: CRUDMappers<
    Equipment,
    EquipmentDto,
    EquipmentCreate,
    EquipmentCreateDto,
    EquipmentUpdate,
    EquipmentUpdateDto
> = {
    model: mapEquipmentDtoToDomain,
    create: mapEquipmentCreateDomainToDto,
    update: mapEquipmentUpdateDomainToDto,
}

class EquipmentRepository extends CRUDRepository<
    Equipment,
    EquipmentDto,
    EquipmentCreate,
    EquipmentCreateDto,
    EquipmentUpdate,
    EquipmentUpdateDto,
    EquipmentFilters,
    EquipmentSortBy
> implements EquipmentRepositoryInterface {
    constructor() {
        super(Endpoints.equipment, equipmentMappers);
    }

    async get(id: string): Promise<Equipment> {
        const json = await this.request<EquipmentDto>(Endpoints.equipment.get(id));
        return this.mappers.model(json);
    }
}

export { EquipmentRepository };