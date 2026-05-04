import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigation } from "../../config/navigation";
import { projectTheme } from "../../config/theme";
import { BrandLogo } from "./BrandLogo";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const linkBase =
  "group flex items-center gap-3 rounded-2xl border px-4 py-3 transition";

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm transition md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 border-r border-white/10 bg-slate-950/95 px-4 py-5 shadow-soft backdrop-blur transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-3">
            <BrandLogo className="h-14 w-[160px]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#39B54A]">
                {projectTheme.clientName}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Dashboard GEI + Biodiversidad
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 md:hidden"
            aria-label="Cerrar navegación"
          >
            <X size={18} />
          </button>
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
                  `${linkBase} ${isActive ? "border-emerald-400/40 bg-emerald-400/10 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"}`
                }
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/80">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className="block truncate text-xs text-slate-400">
                    {item.description}
                  </span>
                </span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
