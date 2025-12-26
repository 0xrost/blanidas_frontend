const excludeNullFields = (value: unknown) =>
    value === null ? undefined : value;

export { excludeNullFields };