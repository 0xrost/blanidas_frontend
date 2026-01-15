import {EquipmentRepository} from "@/dependencies.ts";
import {
    createEquipmentUseCase,
    deleteEquipmentUseCase, getEquipmentQrDataUseCase,
    getEquipmentUseCase,
    listEquipmentUseCase,
    updateEquipmentUseCase
} from "@/domain/useCases/equipment.ts";
import {useQuery} from "@tanstack/react-query";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";

const useEquipmentById = (id: string) => {
    return useQuery({
        queryKey: ['equipment', id],
        queryFn: () => getEquipmentUseCase(EquipmentRepository)(id)
    })
}

const useEquipmentQrData = () => {
    return useQuery({
        queryKey: ['equipment-qr-codes'],
        queryFn: () => getEquipmentQrDataUseCase(EquipmentRepository)(),
        gcTime: 0,
    })
}


const equipmentHooks = createCrudHooks(
    'equipment',
    listEquipmentUseCase(EquipmentRepository),
    createEquipmentUseCase(EquipmentRepository),
    updateEquipmentUseCase(EquipmentRepository),
    deleteEquipmentUseCase(EquipmentRepository)
);

const useEquipment = equipmentHooks.useList;
const useCreateEquipment = equipmentHooks.useCreate;
const useUpdateEquipment = equipmentHooks.useUpdate;
const useDeleteEquipment = equipmentHooks.useDelete;

export {
    useEquipment,
    useEquipmentById,
    useCreateEquipment,
    useUpdateEquipment,
    useDeleteEquipment,
    useEquipmentQrData,
};