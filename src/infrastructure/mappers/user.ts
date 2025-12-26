import type {UserDTO} from "@/infrastructure/dto/user.ts";
import type {User} from "@/domain/entities/user.ts";

const mapApiUser = (api: UserDTO): User => {
    const {
        hire_at,
        phone_number,
        receive_low_stock_notification,
        receive_repair_request_created_notification,
        ...rest
    } = api;

    return {
        ...rest,
        hireAt: hire_at,
        phoneNumber: phone_number,
        receiveLowStockNotification: receive_low_stock_notification,
        receiveRepairRequestCreatedNotification: receive_repair_request_created_notification,
    }
}

export { mapApiUser };