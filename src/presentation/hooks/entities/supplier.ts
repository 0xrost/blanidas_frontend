import {SupplierRepository} from "@/dependencies.ts";
import {
    createSupplierUseCase,
    deleteSupplierUseCase,
    listSuppliersUseCase,
    updateSupplierUseCase
} from "@/domain/useCases/suppliers.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";

const supplier = createCrudHooks(
    "supplier",
    listSuppliersUseCase(SupplierRepository),
    createSupplierUseCase(SupplierRepository),
    updateSupplierUseCase(SupplierRepository),
    deleteSupplierUseCase(SupplierRepository)
);

const useSuppliers = supplier.useList;
const useCreateSupplier = supplier.useCreate;
const useUpdateSupplier = supplier.useUpdate;
const useDeleteSupplier = supplier.useDelete;

export {
    useSuppliers,
    useCreateSupplier,
    useUpdateSupplier,
    useDeleteSupplier,
};