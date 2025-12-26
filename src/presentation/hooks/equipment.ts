import {EquipmentRepository} from "@/dependencies.ts";
import {findByIdEquipment} from "@/domain/useCases/equipment.ts";
import {useQuery} from "@tanstack/react-query";

const useFindByIdEquipment = (id: string) => {
    return useQuery({
        queryKey: ['equipment', id],
        queryFn: () => findByIdEquipment(EquipmentRepository)(id)
    })
}

export { useFindByIdEquipment };