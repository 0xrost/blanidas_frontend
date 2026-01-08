import {getEquipmentIdQrCodeUrl} from "@/domain/useCases/qrCode.ts";
import {QrCodeService} from "@/dependencies.ts";

const useGetEquipmentIdQrCodeUrl = (id: string) => {
    return getEquipmentIdQrCodeUrl(QrCodeService)(id);
}

export { useGetEquipmentIdQrCodeUrl };