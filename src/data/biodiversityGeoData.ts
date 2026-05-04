import type { BiodiversityStatus } from "./biodiversityData";

export type BiodiversityGeoPoint = {
  id: string;
  name: string;
  type: string;
  ecosystemType: string;
  locationLabel: string;
  latitude: number;
  longitude: number;
  priority: "Alta" | "Media" | "Baja";
  status: BiodiversityStatus;
  description: string;
  kpis: Array<{
    label: string;
    value: string;
  }>;
  layers: string[];
  position: {
    x: number;
    y: number;
  };
};

export const biodiversityGeoPoints: BiodiversityGeoPoint[] = [
  {
    id: "bosque-tambillo",
    name: "Bosque del Tambillo",
    type: "Punto de interés",
    ecosystemType: "Bosque de tamarugos",
    locationLabel: "San Pedro de Atacama, Región de Antofagasta",
    latitude: -23.05,
    longitude: -68.18,
    priority: "Alta",
    status: "medio",
    description:
      "Sector de interés ecosistémico asociado a cobertura vegetal nativa, monitoreo de fauna y seguimiento de presión antrópica en el entorno del valle.",
    kpis: [
      { label: "Cobertura vegetal", value: "78%" },
      { label: "Riqueza de especies", value: "67 especies" },
      { label: "Estado ecosistémico", value: "Medio" },
      { label: "Presencia de invasoras", value: "5 registros" },
    ],
    layers: [
      "Puntos de avistamiento",
      "Transectos de monitoreo",
      "Zonas sensibles",
      "Área de influencia",
    ],
    position: {
      x: 48,
      y: 44,
    },
  },
  {
    id: "san-pedro-centro",
    name: "San Pedro de Atacama",
    type: "Referencia territorial",
    ecosystemType: "Centro urbano turístico",
    locationLabel: "Cabecera comunal",
    latitude: -22.91,
    longitude: -68.20,
    priority: "Media",
    status: "bueno",
    description: "Punto de referencia para accesos, flujos de visitantes y trazabilidad territorial.",
    kpis: [
      { label: "Flujo de visitantes", value: "Alto" },
      { label: "Cobertura", value: "Urbana" },
    ],
    layers: ["Acceso vial", "Servicios", "Núcleo urbano"],
    position: {
      x: 30,
      y: 26,
    },
  },
  {
    id: "transecto-aves",
    name: "Transecto de aves",
    type: "Punto de monitoreo",
    ecosystemType: "Corredor de avifauna",
    locationLabel: "Sector de observación norte",
    latitude: -23.08,
    longitude: -68.12,
    priority: "Alta",
    status: "bueno",
    description: "Punto de observación para especies residentes y migratorias asociado a campañas de terreno.",
    kpis: [
      { label: "Avistamientos", value: "24 registros" },
      { label: "Riqueza", value: "18 especies" },
    ],
    layers: ["Transectos de aves", "Monitoreo estacional"],
    position: {
      x: 68,
      y: 58,
    },
  },
  {
    id: "zona-control",
    name: "Zona control",
    type: "Control comparativo",
    ecosystemType: "Área de referencia",
    locationLabel: "Periferia de monitoreo",
    latitude: -23.01,
    longitude: -68.25,
    priority: "Baja",
    status: "bueno",
    description: "Área usada para comparar tendencias de cobertura y presión ecológica respecto del sitio principal.",
    kpis: [
      { label: "Cobertura vegetal", value: "64%" },
      { label: "Presión", value: "Baja" },
    ],
    layers: ["Línea base", "Puntos de control"],
    position: {
      x: 18,
      y: 62,
    },
  },
  {
    id: "ruta-acceso",
    name: "Ruta de acceso",
    type: "Infraestructura",
    ecosystemType: "Corredor antrópico",
    locationLabel: "Camino de acceso al sector",
    latitude: -23.03,
    longitude: -68.21,
    priority: "Media",
    status: "medio",
    description: "Corredor de tránsito que permite vincular visitas, operación y control de acceso al punto principal.",
    kpis: [
      { label: "Tránsito", value: "Moderado" },
      { label: "Intervención", value: "Lineal" },
    ],
    layers: ["Ruta de acceso", "Fiscalización", "Señalización"],
    position: {
      x: 40,
      y: 72,
    },
  },
];

export const biodiversityGeoDefaultPointId = "bosque-tambillo";
