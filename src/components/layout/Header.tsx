import type { LucideIcon } from "lucide-react";
import { Bell, LayoutGrid, List, Menu, Search } from "lucide-react";
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
    <header className="sticky top-0 z-20 border-b border-[#D7CCC1] bg-white/96 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D7CCC1] bg-[#FFF9F1] text-[#362F32] transition hover:bg-[#EBE6DB] md:hidden"
          aria-label="Abrir navegación"
        >
          <MenuIcon size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-12 w-[112px]" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9EA900]">
                {projectTheme.clientName}
              </p>
              <h1 className="truncate text-[30px] font-semibold leading-none text-[#362F32]">
                {projectTheme.projectName}
              </h1>
            </div>
          </div>
          <p className="mt-1 text-sm text-[#5B6165]">{projectTheme.subtitle}</p>
        </div>

        <div className="hidden min-w-[220px] max-w-[360px] flex-1 items-center rounded-2xl border border-[#D7CCC1] bg-[#FFF9F1] px-4 py-2 text-[#5B6165] lg:flex">
          <Search size={16} className="mr-2 shrink-0 text-[#B79FB1]" />
          <span className="text-sm">Buscar indicador...</span>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex rounded-2xl border border-[#D7CCC1] bg-[#FFF9F1] p-1 text-sm">
            <button className="rounded-xl bg-[#3A283A] px-4 py-2 font-semibold text-white">Todos</button>
            <button className="rounded-xl px-4 py-2 text-[#5B6165]">Activos</button>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#D7CCC1] bg-[#FFF9F1] px-2 py-1">
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#3A283A] text-white" aria-label="Vista cuadrícula">
              <LayoutGrid size={16} />
            </button>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#5B6165]" aria-label="Vista lista">
              <List size={16} />
            </button>
          </div>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D7CCC1] bg-[#FFF9F1] text-[#5B6165]">
            <Bell size={16} />
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EC1B91] text-sm font-semibold text-white">
            JP
          </div>
        </div>
      </div>
    </header>
  );
}
