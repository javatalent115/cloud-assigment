export const numberFormat = (value) =>
    new Intl.NumberFormat({
        style: "decimal",
    }).format(value);
