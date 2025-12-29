type FilterOperator = "eq" | "ne" | "ilike" | "gte" | "lte" | "gt" | "lt";

interface FilterDefinition {
    field: string;
    operator: FilterOperator;
}

function buildFiltersQuery<T>(
    filters: Partial<T>,
    queryMap: Record<keyof T, FilterDefinition>
): string {
    const params: string[] = [];

    for (const [key, value] of Object.entries(filters)) {
        if (value === undefined || value === null || value === "") continue;

        const definition = queryMap[key as keyof T];
        if (!definition) continue;

        const paramName = `${definition.field}__${definition.operator}`;
        params.push(`${paramName}=${String(value)}`);
    }

    return params.join("&");
}

export { buildFiltersQuery };
export type { FilterDefinition };
