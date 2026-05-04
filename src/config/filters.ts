export type FilterOption = {
  label: string;
  value: string;
};

export type FilterField = {
  id: string;
  label: string;
  options: FilterOption[];
};

export const yearOptions = [
  { label: "2024", value: "2024" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
];

export const installationOptions = [
  { label: "Planta San Pedro", value: "planta-san-pedro" },
  { label: "Centro Logístico Norte", value: "centro-logistico-norte" },
  { label: "Oficina Central", value: "oficina-central" },
];

export const generalFilters: FilterField[] = [
  { id: "año", label: "Año", options: yearOptions },
  { id: "instalación", label: "Instalación", options: installationOptions },
  {
    id: "país",
    label: "País",
    options: [
      { label: "Chile", value: "chile" },
      { label: "Perú", value: "peru" },
      { label: "Argentina", value: "argentina" },
    ],
  },
  {
    id: "unidad-negocio",
    label: "Unidad de negocio",
    options: [
      { label: "Producción", value: "produccion" },
      { label: "Logística", value: "logistica" },
      { label: "Corporativo", value: "corporativo" },
    ],
  },
];

export const scopeFilters: FilterField[] = [
  { id: "año", label: "Año", options: yearOptions },
  { id: "instalación", label: "Instalación", options: installationOptions },
];

export const biodiversityFilters: FilterField[] = [
  { id: "campaña", label: "Campaña", options: yearOptions },
  {
    id: "zona",
    label: "Zona",
    options: [
      { label: "Predio principal", value: "predio-principal" },
      { label: "Área de influencia", value: "area-influencia" },
      { label: "Corredor ecológico", value: "corredor-ecologico" },
    ],
  },
];

