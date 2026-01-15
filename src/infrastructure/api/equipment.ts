import {Endpoints} from "@/infrastructure/endpoints.ts";
import {
    mapEquipmentCreateDomainToDto,
    mapEquipmentDtoToDomain, mapEquipmentQrDataDtoToDomain,
    mapEquipmentUpdateDomainToDto
} from "@/infrastructure/mappers/equipment.ts";
import type {Equipment, EquipmentQrData} from "@/domain/entities/equipment.ts";
import type {EquipmentRepository as EquipmentRepositoryInterface} from "@/domain/repositories/equipment.ts";
import type {EquipmentFilters, EquipmentSortBy} from "@/domain/queries/equipment-list.query.ts";
import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import type {
    EquipmentCreateDto,
    EquipmentDto,
    EquipmentQrDataDto,
    EquipmentUpdateDto
} from "@/infrastructure/dto/equipment.ts";
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
        const json = await CRUDRepository.request<EquipmentDto>(Endpoints.equipment.get(id));
        return this.mappers.model(json);
    }

    async getQrData(): Promise<EquipmentQrData[]> {
        const json = await CRUDRepository.request<EquipmentQrDataDto[]>(Endpoints.equipment.getQrData());
        return json.map(x => mapEquipmentQrDataDtoToDomain(x));
    }
}

export { EquipmentRepository };