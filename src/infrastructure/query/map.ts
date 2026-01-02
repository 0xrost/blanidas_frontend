type FilterOperator = "eq" | "ne" | "ilike" | "gte" | "lte" | "gt" | "lt";

interface FilterDefinition {
    field: string;
    operator: FilterOperator;
}

export type { FilterDefinition };