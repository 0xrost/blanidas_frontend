import type {Pagination} from "@/domain/models/pagination.ts";
import {useQuery} from "@tanstack/react-query";
import {EquipmentModelsRepository} from "@/dependencies.ts";
import type {EquipmentModelsSorting} from "@/domain/query/equipment-models.query.ts";
import {listEquipmentModelsUseCase} from "@/domain/useCases/equipment-models.ts";

const useEquipmentModels = (pagination: Pagination, sorting: EquipmentModelsSorting) => {
    return useQuery({
        queryKey: ['equipment-models', pagination, sorting],
        queryFn: () => listEquipmentModelsUseCase(EquipmentModelsRepository)(pagination, sorting),
    });
};

export { useEquipmentModels };