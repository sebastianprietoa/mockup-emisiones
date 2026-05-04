import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { biodiversityFilters, generalFilters } from "../config/filters";
import { buildInitialFilterValues } from "../utils/filterValues";

const dashboardFilterFields = [...generalFilters, ...biodiversityFilters];

type DashboardFiltersValue = Record<string, string>;

type DashboardFiltersContextValue = {
  filters: DashboardFiltersValue;
  setFilterValue: (fieldId: string, value: string) => void;
};

const DashboardFiltersContext = createContext<DashboardFiltersContextValue | null>(null);

export function DashboardFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<DashboardFiltersValue>(() =>
    buildInitialFilterValues(dashboardFilterFields),
  );

  const setFilterValue = (fieldId: string, value: string) => {
    setFilters((current) => ({ ...current, [fieldId]: value }));
  };

  return (
    <DashboardFiltersContext.Provider value={{ filters, setFilterValue }}>
      {children}
    </DashboardFiltersContext.Provider>
  );
}

export function useDashboardFilters() {
  const context = useContext(DashboardFiltersContext);

  if (!context) {
    throw new Error("useDashboardFilters must be used within DashboardFiltersProvider");
  }

  return context;
}
