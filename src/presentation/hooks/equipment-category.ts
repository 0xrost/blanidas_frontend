import {useQuery} from "@tanstack/react-query";
import {EquipmentCategoryRepository} from "@/dependencies.ts";
import {listEquipmentCategory} from "@/domain/useCases/equipment-category.ts";

const useListEquipmentCategory = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['equipment-category', page, limit],
        queryFn: () => listEquipmentCategory(EquipmentCategoryRepository)(page, limit),
    })
}

export { useListEquipmentCategory };