export type BiodiversityGeoStatus = "bueno" | "medio" | "crítico";

export type BiodiversityGeoPoint = {
  id: string;
  name: string;
  type: string;
  ecosystemType: string;
  locationLabel: string;
  latitude: number;
  longitude: number;
  priority: "Alta" | "Media" | "Baja";
  status: BiodiversityGeoStatus;
  description: string;
  kpis: Array<{ label: string; value: string }>;
  layers: string[];
  markerColor: string;
};

export const biodiversityGeoPoints: BiodiversityGeoPoint[] = [
  {
    id: "bosque-del-tambillo",
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
    layers: ["Puntos de avistamiento", "Transectos de monitoreo", "Zonas sensibles", "Área de influencia"],
    markerColor: "#34d399",
  },
  {
    id: "laguna-chaxa",
    name: "Laguna Chaxa",
    type: "Sitio de interés ecológico",
    ecosystemType: "Humedal altoandino / salar",
    locationLabel: "Salar de Atacama, Región de Antofagasta",
    latitude: -23.288,
    longitude: -68.179,
    priority: "Alta",
    status: "medio",
    description:
      "Humedal salino asociado a la Reserva Nacional Los Flamencos, relevante para avifauna altoandina, flamencos y monitoreo de presión hídrica.",
    kpis: [
      { label: "Avifauna registrada", value: "42 especies" },
      { label: "Presencia de flamencos", value: "Alta" },
      { label: "Estado hídrico", value: "Medio" },
      { label: "Presión turística", value: "Media" },
    ],
    layers: ["Puntos de avistamiento", "Zonas sensibles", "Monitoreo hídrico", "Área de influencia"],
    markerColor: "#f97316",
  },
  {
    id: "humedal-rio-cruces",
    name: "Humedal del Río Cruces",
    type: "Humedal protegido",
    ecosystemType: "Humedal ribereño",
    locationLabel: "Valdivia, Región de Los Ríos",
    latitude: -39.735,
    longitude: -73.245,
    priority: "Alta",
    status: "crítico",
    description:
      "Sistema de humedales de alto valor ecológico, relevante para aves acuáticas, especies nativas y seguimiento de presiones antrópicas.",
    kpis: [
      { label: "Aves acuáticas", value: "58 especies" },
      { label: "Cobertura de humedal", value: "86%" },
      { label: "Estado ecosistémico", value: "Crítico" },
      { label: "Presión antrópica", value: "Alta" },
    ],
    layers: ["Puntos de avistamiento", "Zonas sensibles", "Transectos de monitoreo", "Área protegida"],
    markerColor: "#38bdf8",
  },
  {
    id: "parque-la-campana",
    name: "Parque Nacional La Campana",
    type: "Área protegida",
    ecosystemType: "Bosque esclerófilo y palma chilena",
    locationLabel: "Región de Valparaíso",
    latitude: -32.956,
    longitude: -71.082,
    priority: "Alta",
    status: "bueno",
    description:
      "Área protegida representativa de bosque esclerófilo mediterráneo, relevante para monitoreo de palma chilena, biodiversidad nativa y riesgo de incendios.",
    kpis: [
      { label: "Riqueza de especies", value: "112 especies" },
      { label: "Cobertura vegetal", value: "74%" },
      { label: "Palma chilena monitoreada", value: "Presente" },
      { label: "Riesgo de incendio", value: "Medio" },
    ],
    layers: ["Área protegida", "Transectos de monitoreo", "Zonas sensibles", "Puntos de avistamiento"],
    markerColor: "#22c55e",
  },
  {
    id: "san-pedro-atacama",
    name: "San Pedro de Atacama",
    type: "Referencia territorial",
    ecosystemType: "Centro urbano y valle oasis",
    locationLabel: "Cabecera comunal",
    latitude: -22.915,
    longitude: -68.203,
    priority: "Media",
    status: "bueno",
    description: "Referencia territorial para lectura de contexto, accesos y presión de uso de suelo.",
    kpis: [
      { label: "Cobertura vegetal", value: "61%" },
      { label: "Riqueza de especies", value: "45 especies" },
    ],
    layers: ["Área de influencia", "Puntos de avistamiento"],
    markerColor: "#38bdf8",
  },
  {
    id: "transecto-de-aves",
    name: "Transecto de aves",
    type: "Punto de monitoreo",
    ecosystemType: "Corredor de avifauna",
    locationLabel: "Sector norte de observación",
    latitude: -23.08,
    longitude: -68.12,
    priority: "Alta",
    status: "bueno",
    description: "Punto de observación para especies residentes y migratorias asociado a campañas de terreno.",
    kpis: [
      { label: "Avistamientos", value: "24 registros" },
      { label: "Riqueza", value: "18 especies" },
    ],
    layers: ["Transectos de monitoreo", "Monitoreo estacional"],
    markerColor: "#f59e0b",
  },
  {
    id: "zona-control",
    name: "Zona control",
    type: "Punto de contraste",
    ecosystemType: "Salar / zona árida",
    locationLabel: "Área referencial exterior",
    latitude: -23.066,
    longitude: -68.14,
    priority: "Media",
    status: "medio",
    description: "Área de contraste para comparar cobertura, presión y registros de especies entre zonas.",
    kpis: [
      { label: "Cobertura vegetal", value: "33%" },
      { label: "Especies invasoras", value: "2 registros" },
    ],
    layers: ["Zonas sensibles", "Área de influencia"],
    markerColor: "#14b8a6",
  },
  {
    id: "ruta-de-acceso",
    name: "Ruta de acceso",
    type: "Infraestructura",
    ecosystemType: "Corredor vial",
    locationLabel: "Acceso vehicular al predio",
    latitude: -23.09,
    longitude: -68.19,
    priority: "Media",
    status: "medio",
    description: "Trayecto de ingreso para seguimiento de accesos, tránsito operativo y puntos de control.",
    kpis: [
      { label: "Tránsito", value: "Bajo" },
      { label: "Capas activas", value: "2" },
    ],
    layers: ["Área de influencia", "Puntos de avistamiento"],
    markerColor: "#fb923c",
  },
];

