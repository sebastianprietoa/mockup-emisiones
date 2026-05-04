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
  { label: "2018", value: "2018" },
];

export const installationOptions: FilterOption[] = [
  allOption,
  { label: "Atacama Inca Tour", value: "Atacama Inca Tour" },
  { label: "Chile Road", value: "Chile Road" },
  { label: "Cosmo Andino", value: "Cosmo Andino" },
  { label: "Flavia Bia Expediciones", value: "Flavia Bia Expediciones" },
  { label: "Maxim Expediciones", value: "Maxim Expediciones" },
  { label: "Talatur Expediciones", value: "Talatur Expediciones" },
  { label: "Lalck-Cketi Turismo", value: "Lalck-Cketi Turismo" },
  { label: "El Relincho", value: "El Relincho" },
  { label: "AT Valle de La Luna", value: "AT Valle de La Luna" },
  { label: "Sol del Desierto", value: "Sol del Desierto" },
  { label: "Hotel Ampaymi", value: "Hotel Ampaymi" },
  { label: "Atacama Loft-Glamp", value: "Atacama Loft-Glamp" },
  { label: "Casa Don Esteban", value: "Casa Don Esteban" },
  { label: "ByB Quinta Adela", value: "ByB Quinta Adela" },
  { label: "Hostal Lickana", value: "Hostal Lickana" },
  { label: "Ckamur Atacama Ethono Lodge", value: "Ckamur Atacama Ethono Lodge" },
  { label: "Cabañas Atacama Mística", value: "Cabañas Atacama Mística" },
  { label: "Hostal Sempuray", value: "Hostal Sempuray" },
  { label: "Hostal Ckapin Ohiri", value: "Hostal Ckapin Ohiri" },
  { label: "Hostal Hara", value: "Hostal Hara" },
  { label: "Hostal Lakha-Cketi", value: "Hostal Lakha-Cketi" },
  { label: "Hostal Takha Takha", value: "Hostal Takha Takha" },
  { label: "Hotel Kimal", value: "Hotel Kimal" },
  { label: "Hotel La Cochera", value: "Hotel La Cochera" },
  { label: "Hostal Ckausatur", value: "Hostal Ckausatur" },
  { label: "Hostal Rukazen", value: "Hostal Rukazen" },
  { label: "Cabañas Rio Yaye", value: "Cabañas Rio Yaye" },
  { label: "Barros Nativo", value: "Barros Nativo" },
  { label: "Adobe", value: "Adobe" },
  { label: "Café Peregrino", value: "Café Peregrino" },
  { label: "Comida Al Paso", value: "Comida Al Paso" },
  { label: "Estaka", value: "Estaka" },
  { label: "La Casona", value: "La Casona" },
  { label: "Mercado Blanco", value: "Mercado Blanco" },
  { label: "Restaurante Sol Inti", value: "Restaurante Sol Inti" },
  { label: "Barros Restaurante", value: "Barros Restaurante" },
  { label: "Barros Café", value: "Barros Café" },
  { label: "Aldea Tulor", value: "Aldea Tulor" },
];

export const countryOptions: FilterOption[] = [
  allOption,
  { label: "Chile", value: "Chile" },
];

export const businessUnitOptions: FilterOption[] = [
  allOption,
  { label: "Agencia de Turismo", value: "Agencia de Turismo" },
  { label: "Alojamiento", value: "Alojamiento" },
  { label: "Restaurante", value: "Restaurante" },
  { label: "Comunidad Atacameña de Coyo", value: "Comunidad Atacameña de Coyo" },
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
