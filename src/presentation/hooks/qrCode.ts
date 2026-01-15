import {getEquipmentIdQrCodeUrl} from "@/domain/useCases/qrCode.ts";
import {QrCodeService} from "@/dependencies.ts";
import {useMemo, useState} from "react";
import type {EquipmentQrData} from "@/domain/entities/equipment.ts";
import type {DataToShow} from "@/presentation/components/tabs/equipment/QrModal.tsx";

const useEquipmentQrCodes = (initial: EquipmentQrData[]) => {
    const [data, setData] = useState<EquipmentQrData[]>(initial);

    const result = useMemo(() => {
        return data.map(x => {
            return {
                url: getEquipmentIdQrCodeUrl(QrCodeService)(x.id),
                institutionName: x.institutionName,
                serialNumber: x.serialNumber,
            } satisfies DataToShow;
        })
    }, [data]);

    return [result, setData] as const;
}

export { useEquipmentQrCodes };