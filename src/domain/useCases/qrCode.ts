import type {QrCodeService} from "@/infrastructure/services/qrCode.ts";

const getEquipmentIdQrCodeUrl = (service: QrCodeService) => {
    return (id: string) => service.generateEquipmentIdQrCodeUrl(id);
}

export { getEquipmentIdQrCodeUrl };