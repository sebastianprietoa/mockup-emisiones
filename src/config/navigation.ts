import {
  BarChart3,
  Leaf,
  LayoutDashboard,
  ScanSearch,
  ShieldCheck,
  Wheat,
} from "lucide-react";

export const navigation = [
  {
    label: "Home",
    path: "/",
    description: "Resumen ejecutivo",
    icon: LayoutDashboard,
  },
  {
    label: "Resultados generales",
    path: "/resultados-generales",
    description: "Distribución corporativa",
    icon: BarChart3,
  },
  {
    label: "Scope 1",
    path: "/scope1",
    description: "Emisiones directas",
    icon: ShieldCheck,
  },
  {
    label: "Scope 2",
    path: "/scope2",
    description: "Electricidad y energía",
    icon: ScanSearch,
  },
  {
    label: "Scope 3",
    path: "/scope3",
    description: "Cadena de valor",
    icon: Wheat,
  },
  {
    label: "Biodiversidad",
    path: "/biodiversidad",
    description: "TNFD y naturaleza",
    icon: Leaf,
  },
] as const;

