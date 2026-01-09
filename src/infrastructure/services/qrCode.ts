const equipmentIdPlaceholder = "$equipmentId";

class QrCodeService {
    private readonly url: string;
    constructor(equipmentIdUrl: string) {
        if (!equipmentIdUrl.includes(equipmentIdPlaceholder)) {
            throw new Error(`URL must contain the ${equipmentIdPlaceholder} placeholder`);
        }

        this.url = equipmentIdUrl;
    }

    generateEquipmentIdQrCodeUrl = (id: string): string => {
        return this.url.replace(equipmentIdPlaceholder, id);
    }
}

export { QrCodeService };