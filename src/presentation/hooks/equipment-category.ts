import {useQuery} from "@tanstack/react-query";
import {EquipmentCategoryRepository} from "@/dependencies.ts";
import {listEquipmentCategoriesUseCase} from "@/domain/useCases/equipment-category.ts";
import type {Pagination} from "@/domain/models/pagination.ts";

const useEquipmentCategories = (pagination: Pagination) => {
    return useQuery({
        queryKey: ['equipment-categories', pagination],
        queryFn: () => listEquipmentCategoriesUseCase(EquipmentCategoryRepository)(pagination),
    })
}

export { useEquipmentCategories };