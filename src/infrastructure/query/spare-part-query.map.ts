import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {SparePartFilters, SparePartSortBy} from "@/domain/queries/spare-part-list.query.ts";

const sparePartsFilterMap: Record<keyof SparePartFilters, FilterDefinition> = {
    name: {
        field: "name",
        operator: "ilike",
    },
    status: {
        field: "stock_status",
        operator: "eq",
    },
    institutionId: {
        field: "institution_id",
        operator: "eq",
    },
    modelId: {
        field: "compatible_model_id",
        operator: "eq",
    },
    categoryId: {
        field: "spare_part_category_id",
        operator: "eq",
    }
};

const sparePartsSortMap: Record<SparePartSortBy, string> = {
    status: "status",
    name: "name",
    quantity: "quantity",
}

export {
    sparePartsFilterMap,
    sparePartsSortMap,
};