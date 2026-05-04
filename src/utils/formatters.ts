export function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("es-CL", {
    maximumFractionDigits,
  }).format(value);
}

export function formatTons(value: number) {
  return `${formatNumber(value, 1)} tCO2e`;
}

export function formatKg(value: number) {
  return `${formatNumber(value)} kgCO2e`;
}

export function formatKwh(value: number) {
  return `${formatNumber(value)} kWh`;
}

export function formatPercent(value: number) {
  return `${formatNumber(value, 1)}%`;
}

export function formatSignedPercent(value: number) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${formatPercent(value)}`;
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat("es-CL", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

