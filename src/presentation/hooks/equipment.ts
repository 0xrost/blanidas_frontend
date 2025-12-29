import {EquipmentRepository} from "@/dependencies.ts";
import {findEquipmentByIdUseCase} from "@/domain/useCases/equipment.ts";
import {useQuery} from "@tanstack/react-query";

const useEquipmentById = (id: string) => {
    return useQuery({
        queryKey: ['equipment', id],
        queryFn: () => findEquipmentByIdUseCase(EquipmentRepository)(id)
    })
}

export { useEquipmentById };