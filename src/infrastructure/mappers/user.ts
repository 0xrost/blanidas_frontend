import type {UserDto} from "@/infrastructure/dto/user.ts";
import type {User} from "@/domain/entities/user.ts";

const mapUserDtoToDomain = (dto: UserDto): User => {
    const {
        hire_at,
        phone_number,
        receive_low_stock_notification,
        receive_repair_request_created_notification,
        ...rest
    } = dto;

    return {
        ...rest,
        hireAt: hire_at,
        phoneNumber: phone_number,
        receiveLowStockNotification: receive_low_stock_notification,
        receiveRepairRequestCreatedNotification: receive_repair_request_created_notification,
    }
}

export { mapUserDtoToDomain };