export type FilterOption = {
  label: string;
  value: string;
};

export type FilterField = {
  id: string;
  label: string;
  options: FilterOption[];
};

export const allOption: FilterOption = { label: "Todos", value: "all" };

export const yearOptions: FilterOption[] = [
  allOption,
  { label: "2024", value: "2024" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
];

export const installationOptions: FilterOption[] = [
  allOption,
  { label: "Planta San Pedro", value: "Planta San Pedro" },
  { label: "Centro Logístico Norte", value: "Centro Logistico Norte" },
  { label: "Oficina Central", value: "Oficina Central" },
];

export const countryOptions: FilterOption[] = [
  allOption,
  { label: "Chile", value: "Chile" },
  { label: "Perú", value: "Peru" },
  { label: "Argentina", value: "Argentina" },
];

export const businessUnitOptions: FilterOption[] = [
  allOption,
  { label: "Producción", value: "Produccion" },
  { label: "Logística", value: "Logistica" },
  { label: "Corporativo", value: "Corporativo" },
];

export const campaignOptions: FilterOption[] = [
  allOption,
  { label: "2024", value: "2024" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
];

export const zoneOptions: FilterOption[] = [
  allOption,
  { label: "Predio principal", value: "predio-principal" },
  { label: "Área de influencia", value: "area-influencia" },
  { label: "Corredor ecológico", value: "corredor-ecologico" },
];

export const generalFilters: FilterField[] = [
  { id: "year", label: "Año", options: yearOptions },
  { id: "installation", label: "Instalación", options: installationOptions },
  { id: "country", label: "País", options: countryOptions },
  { id: "businessUnit", label: "Unidad de negocio", options: businessUnitOptions },
];

export const scopeFilters: FilterField[] = [
  { id: "year", label: "Año", options: yearOptions },
  { id: "installation", label: "Instalación", options: installationOptions },
];

export const biodiversityFilters: FilterField[] = [
  { id: "campaign", label: "Campaña", options: campaignOptions },
  { id: "zone", label: "Zona", options: zoneOptions },
];
