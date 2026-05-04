import { useMemo, useState } from "react";
import { Layers3, LocateFixed, MapPin, MountainSnow } from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";
import { biodiversityGeoDefaultPointId, biodiversityGeoPoints } from "../../data/biodiversityGeoData";

const pointTone: Record<"Alta" | "Media" | "Baja", string> = {
  Alta: "bg-emerald-400 text-slate-950",
  Media: "bg-amber-400 text-slate-950",
  Baja: "bg-slate-300 text-slate-950",
};

export function BiodiversityMap() {
  const defaultPoint = useMemo(
    () => biodiversityGeoPoints.find((point) => point.id === biodiversityGeoDefaultPointId) ?? biodiversityGeoPoints[0],
    [],
  );
  const [selectedPoint, setSelectedPoint] = useState(defaultPoint);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">Georreferencia de puntos de interés</h3>
          <p className="text-sm text-slate-400">Mapa de monitoreo territorial integrado en Biodiversidad / TNFD.</p>
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-slate-400">
          <LocateFixed size={14} className="text-emerald-300" />
          Coordenadas referenciales y editables
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(57,181,74,0.18),transparent_24%),radial-gradient(circle_at_80%_35%,rgba(0,169,157,0.18),transparent_26%),linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.98))]">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="absolute inset-x-6 top-6 flex items-center justify-between text-xs text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1">
                <MountainSnow size={14} />
                Bosque del Tambillo
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1">
                <Layers3 size={14} />
                TNFD Territorial
              </span>
            </div>

            <div className="relative h-[420px] p-6 sm:h-[480px]">
              <div className="absolute inset-0 rounded-[28px] border border-dashed border-emerald-400/15" />
              {biodiversityGeoPoints.map((point) => {
                const isSelected = point.id === selectedPoint.id;

                return (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => setSelectedPoint(point)}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 text-left outline-none"
                    style={{ left: `${point.position.x}%`, top: `${point.position.y}%` }}
                  >
                    <span
                      className={`absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm transition ${
                        isSelected ? "bg-emerald-400/50" : "bg-slate-400/20"
                      }`}
                    />
                    <span
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-lg transition ${
                        isSelected
                          ? "border-emerald-300 bg-emerald-400 text-slate-950 scale-110"
                          : "border-white/50 bg-slate-950/90 text-slate-200 group-hover:border-emerald-300 group-hover:text-emerald-200"
                      }`}
                    >
                      <MapPin size={18} fill="currentColor" />
                    </span>
                    <span className="mt-2 block max-w-28 rounded-full border border-white/10 bg-slate-950/85 px-2.5 py-1 text-[11px] text-slate-200 opacity-90 shadow-soft">
                      {point.name}
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-slate-300 shadow-soft backdrop-blur">
                <p className="font-medium text-white">Leyenda</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Punto seleccionado
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                    Punto secundario
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Ficha territorial</p>
              <h4 className="mt-2 text-xl font-semibold text-white">{selectedPoint.name}</h4>
              <p className="mt-1 text-sm text-slate-400">{selectedPoint.locationLabel}</p>
            </div>
            <StatusBadge tone={selectedPoint.status} />
          </div>

          <div className="mt-4 space-y-4 text-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Tipo</p>
                <p className="mt-1 text-slate-200">{selectedPoint.type}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Ecosistema</p>
                <p className="mt-1 text-slate-200">{selectedPoint.ecosystemType}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Coordenadas</p>
              <p className="mt-1 text-slate-200">
                {selectedPoint.latitude.toFixed(2)}, {selectedPoint.longitude.toFixed(2)}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Prioridad TNFD</p>
                <p
                  className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${pointTone[selectedPoint.priority]}`}
                >
                  {selectedPoint.priority}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Estado</p>
                <div className="mt-1">
                  <StatusBadge tone={selectedPoint.status} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Descripción</p>
              <p className="mt-1 leading-6 text-slate-200">{selectedPoint.description}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">KPIs asociados</p>
              <div className="mt-3 grid gap-2">
                {selectedPoint.kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <span className="text-slate-300">{kpi.label}</span>
                    <span className="font-medium text-white">{kpi.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Capas sugeridas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedPoint.layers.map((layer) => (
                  <span
                    key={layer}
                    className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200"
                  >
                    {layer}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
