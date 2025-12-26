import type {Pagination} from "@/domain/models/pagination.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";

class FailureTypeRepository implements FailureTypeRepository {
    async list(pagination: Pagination): Promise<FailureType[]> {
        const response = await fetch(Endpoints.failureTypes.list(pagination));
        return (await response.json()).items;
    }
}

export { FailureTypeRepository };