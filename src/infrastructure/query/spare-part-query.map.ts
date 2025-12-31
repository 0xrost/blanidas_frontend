import type {FilterDefinition} from "@/infrastructure/query/query-builder.ts";
import type {SparePartsFilters, SparePartsSortBy} from "@/domain/query/spare-part.query.ts";

const sparePartsFiltersMap: Record<keyof SparePartsFilters, FilterDefinition> = {
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

const sparePartsSortingMap: Record<SparePartsSortBy, string> = {
    status: "status",
    name: "name",
    quantity: "quantity",
}

export {
    sparePartsFiltersMap,
    sparePartsSortingMap,
};