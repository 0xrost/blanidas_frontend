import type {
    RepairRequestUsedSparePartVM
} from "@/presentation/components/tabs/repair-request-details/RepairRequestDetailsTab.tsx";
import type {Location, SparePart} from "@/domain/entities/spare-part.ts";

function getUsedQuantity(
    usedSpareParts: RepairRequestUsedSparePartVM[],
    sparePartId: number,
    institutionId: number
): number {
    return usedSpareParts.reduce((sum, usp) => {
        if (
            usp.sparePart?.id === sparePartId &&
            usp.institution?.id === institutionId
        ) {
            return sum + usp.quantity;
        }
        return sum;
    }, 0);
}

function getEffectiveQuantity(
    usedSpareParts: RepairRequestUsedSparePartVM[],
    sparePartId: number,
    location: Location
): number {
    if (!location.institution) {
        return location.quantity;
    }

    const used = getUsedQuantity(
        usedSpareParts,
        sparePartId,
        location.institution.id
    );

    return Math.max(0, location.quantity - used);
}

function getEffectivePartQuantity(
    usedSpareParts: RepairRequestUsedSparePartVM[],
    part: SparePart
): number {
    return part.locations.reduce((sum, location) => {
        return (
            sum +
            getEffectiveQuantity(
                usedSpareParts,
                part.id,
                location
            )
        );
    }, 0);
}

export { getEffectiveQuantity, getEffectivePartQuantity };