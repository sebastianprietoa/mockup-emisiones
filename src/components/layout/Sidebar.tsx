import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigation } from "../../config/navigation";
import { projectTheme } from "../../config/theme";
import { BrandLogo } from "./BrandLogo";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const linkBase = "group flex items-center gap-3 rounded-2xl border px-4 py-3 transition";

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm transition md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 border-r border-[#4A315A] bg-[#3A283A] px-4 py-5 shadow-soft backdrop-blur transition-transform duration-300 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="mb-6 flex items-start justify-between gap-3 border-b border-[#4A315A] pb-5">
          <div className="min-w-0 space-y-3">
            <BrandLogo className="w-[184px]" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9EA900]">
                {projectTheme.clientName}
              </p>
              <p className="mt-1 text-sm text-[#CFC3C8]">San Pedro de Atacama</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#FFF9F1] md:hidden"
            aria-label="Cerrar navegación"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-4 space-y-1 border-b border-[#4A315A] pb-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8E7A95]">Módulo activo</p>
          <p className="text-sm font-semibold text-[#EC1B91]">Naturaleza · TMIX</p>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "border-[#EC1B91] bg-[#4A315A] text-[#FFF9F1]" : "border-[#5D4A73] bg-[#4A315A]/72 text-[#DCCFD4] hover:border-[#8D76A1] hover:bg-[#57386B] hover:text-white"}`
                }
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#22304C] text-[#FFF9F1] group-hover:bg-[#EC1B91]">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className="block truncate text-xs text-[#B8AEB3]">{item.description}</span>
                </span>
              </NavLink>
          );
        })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 border-t border-[#4A315A] pt-4 text-xs text-[#8E7A95]">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#8E7A95] text-[10px]">?</span>
            <span>Ayuda y privacidad</span>
          </div>
          <p className="mt-3">v2.4.1 · © 2026 Territorio Vivo</p>
        </div>
      </aside>
    </>
  );
}
