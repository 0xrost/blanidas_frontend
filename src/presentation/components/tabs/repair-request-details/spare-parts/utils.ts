import type {
    RepairRequestUsedSparePartVM
} from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import type {Location, SparePart} from "@/domain/entities/spare-part.ts";

function getEffectiveNewQuantity(
    new_: RepairRequestUsedSparePartVM[],
    deleted: RepairRequestUsedSparePartVM[],

    sparePartId: string,
    location: Location
): number {
    const newQuantity = new_.find(x => x.sparePart.id == sparePartId && x.institution.id == location.institution.id)
    const deletedQuantity = deleted.find(x => x.sparePart.id == sparePartId && x.institution.id == location.institution.id)

    const diff = (deletedQuantity?.newQuantity ?? 0) - (newQuantity?.newQuantity ?? 0);
    return location.newQuantity + diff;
}

function getEffectiveRestoredQuantity(
    new_: RepairRequestUsedSparePartVM[],
    deleted: RepairRequestUsedSparePartVM[],

    sparePartId: string,
    location: Location
): number {
    const newQuantity = new_.find(x => x.sparePart.id == sparePartId && x.institution.id == location.institution.id)
    const deletedQuantity = deleted.find(x => x.sparePart.id == sparePartId && x.institution.id == location.institution.id)

    const diff = (deletedQuantity?.restoredQuantity ?? 0) - (newQuantity?.restoredQuantity ?? 0);
    return location.restoredQuantity + diff;
}

function getEffectivePartQuantity(
    new_: RepairRequestUsedSparePartVM[],
    deleted: RepairRequestUsedSparePartVM[],
    part: SparePart
): number {
    const newQuantity = new_
        .filter(x => x.sparePart.id == part.id)
        .map(x => x.newQuantity)
        .reduce((sum, x) => sum + x, 0);

    const newRestoredQuantity = new_
        .filter(x => x.sparePart.id == part.id)
        .map(x => x.restoredQuantity)
        .reduce((sum, x) => sum + x, 0);

    const deletedQuantity = deleted
        .filter(x => x.sparePart.id == part.id)
        .map(x => x.newQuantity)
        .reduce((sum, x) => sum + x, 0);

    const deletedRestoredQuantity = deleted
        .filter(x => x.sparePart.id == part.id)
        .map(x => x.restoredQuantity)
        .reduce((sum, x) => sum + x, 0);

    const diff = (deletedQuantity + deletedRestoredQuantity) - (newQuantity + newRestoredQuantity);
    return part.totalQuantity + diff;
}

export { getEffectiveNewQuantity, getEffectiveRestoredQuantity, getEffectivePartQuantity };