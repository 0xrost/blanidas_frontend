import type {UserCreateDto, UserDto, UserUpdateDto} from "@/infrastructure/dto/user.ts";
import type {User} from "@/domain/entities/user.ts";
import type {UserCreate, UserUpdate} from "@/domain/models/user.ts";

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

const mapUserCreateDomainToDto = (domain: UserCreate): UserCreateDto => {
    return {
        username: domain.username,
        workplace_id: domain.workplaceId,
        role: domain.role,
        email: domain.email,
        hire_at: domain.hireAt,
        department: domain.department,
        password: domain.password,
        phone_number: domain.phone,
        receive_low_stock_notification: domain.receiveLowStockNotification,
        receive_repair_request_created_notification: domain.receiveRepairRequestCreatedNotification,
    }
}

const mapUserUpdateDomainToDto = (domain: UserUpdate): UserUpdateDto => {
    return {
        id: domain.id,
        username: domain.username,
        workplace_id: domain.workplaceId,
        role: domain.role,
        email: domain.email,
        hire_at: domain.hireAt,
        password: domain.password,
        department: domain.department,
        phone_number: domain.phone,
        receive_low_stock_notification: domain.receiveLowStockNotification,
        receive_repair_request_created_notification: domain.receiveRepairRequestCreatedNotification,
    }
}


export {
    mapUserDtoToDomain,
    mapUserCreateDomainToDto,
    mapUserUpdateDomainToDto,
};