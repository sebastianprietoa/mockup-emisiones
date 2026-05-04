import type { LucideIcon } from "lucide-react";
import { ChevronDown, Menu } from "lucide-react";
import { installationOptions, yearOptions } from "../../config/filters";
import { projectTheme } from "../../config/theme";
import { useDashboardFilters } from "../../context/DashboardFiltersContext";
import { BrandLogo } from "./BrandLogo";

type HeaderProps = {
  onMenuClick: () => void;
  menuIcon?: LucideIcon;
};

export function Header({ onMenuClick, menuIcon: MenuIcon = Menu }: HeaderProps) {
  const { filters, setFilterValue } = useDashboardFilters();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10 md:hidden"
          aria-label="Abrir navegación"
        >
          <MenuIcon size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-12 w-[128px]" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#39B54A]">
                {projectTheme.clientName}
              </p>
              <h1 className="truncate text-lg font-semibold text-white sm:text-xl">
                {projectTheme.projectName}
              </h1>
            </div>
          </div>
          <p className="mt-1 text-sm text-slate-400">{projectTheme.subtitle}</p>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <label className="space-y-1 text-xs text-slate-400">
            <span className="block">Año</span>
            <div className="relative">
              <select
                value={filters.year ?? "all"}
                onChange={(event) => setFilterValue("year", event.target.value)}
                className="min-w-28 appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-slate-100 outline-none"
              >
                {yearOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
            </div>
          </label>

          <label className="space-y-1 text-xs text-slate-400">
            <span className="block">Instalación</span>
            <div className="relative">
              <select
                value={filters.installation ?? "all"}
                onChange={(event) => setFilterValue("installation", event.target.value)}
                className="min-w-56 appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-slate-100 outline-none"
              >
                {installationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
            </div>
          </label>
        </div>
      </div>
    </header>
  );
}

