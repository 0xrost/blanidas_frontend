/*
* import {useQuery} from "@tanstack/react-query";
import type {EquipmentRepository} from "@/domain/repositories/equipment.ts";

const findById = (id: string) => {
    return useQuery({
        queryKey: ['equipment', id],
        queryFn: () => repo.findById(id)
    })

};

export { useFindEquipmentById };
* */

import type {EquipmentRepository} from "@/domain/repositories/equipment.ts";

const findByIdEquipment =
    (repo: EquipmentRepository) =>
        async (id: string) => await repo.findById(id);

export { findByIdEquipment };