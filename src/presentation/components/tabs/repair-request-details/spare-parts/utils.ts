import type {
    RepairRequestUsedSparePartVM
} from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import type {Location, SparePart} from "@/domain/entities/spare-part.ts";

function getEffectiveQuantity(
    new_: RepairRequestUsedSparePartVM[],
    deleted: RepairRequestUsedSparePartVM[],

    sparePartId: string,
    location: Location
): number {
    const newQuantity = new_.find(x => x.sparePart.id == sparePartId && x.institution.id == location.institution.id)
    const deletedQuantity = deleted.find(x => x.sparePart.id == sparePartId && x.institution.id == location.institution.id)

    const diff = (deletedQuantity?.quantity ?? 0) - (newQuantity?.quantity ?? 0);
    return location.quantity + diff;
}

function getEffectivePartQuantity(
    new_: RepairRequestUsedSparePartVM[],
    deleted: RepairRequestUsedSparePartVM[],
    part: SparePart
): number {
    const newQuantity = new_
        .filter(x => x.sparePart.id == part.id)
        .map(x => x.quantity)
        .reduce((sum, x) => sum + x, 0);

    const deletedQuantity = deleted
        .filter(x => x.sparePart.id == part.id)
        .map(x => x.quantity)
        .reduce((sum, x) => sum + x, 0);

    const diff = deletedQuantity - newQuantity;
    return part.totalQuantity + diff;
}

export { getEffectiveQuantity, getEffectivePartQuantity };