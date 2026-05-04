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

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.95fr)]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1">
              <MountainSnow size={14} />
              Bosque del Tambillo
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1">
              <Layers3 size={14} />
              TNFD Territorial
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-200">
              <LocateFixed size={14} />
              5 puntos activos
            </span>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_20%_22%,rgba(57,181,74,0.16),transparent_22%),radial-gradient(circle_at_78%_28%,rgba(0,169,157,0.14),transparent_22%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))]">
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:64px_64px]" />

            <div className="relative flex min-h-[560px] flex-col p-5 sm:min-h-[640px]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-2xl font-semibold text-white">Mapa de monitoreo biodiversidad</h4>
                  <p className="mt-1 text-sm text-slate-400">Bosque del Tambillo · punto de interés</p>
                </div>
                <div className="hidden rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs text-slate-300 shadow-soft backdrop-blur sm:block">
                  <p className="uppercase tracking-[0.2em] text-slate-400">Referencia</p>
                  <p className="mt-1 text-white">Vista mock cartográfica</p>
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-[24px] border border-emerald-400/20 bg-[radial-gradient(circle_at_18%_25%,rgba(57,181,74,0.10),transparent_16%),radial-gradient(circle_at_65%_70%,rgba(255,255,255,0.05),transparent_12%),linear-gradient(180deg,rgba(11,30,24,0.82),rgba(7,22,18,0.96))]">
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(34,197,94,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />

                <div className="absolute inset-0">
                  <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M6 18 C18 13, 30 16, 41 23 S65 36, 79 28 S90 20, 96 18" fill="none" stroke="rgba(57,181,74,0.28)" strokeWidth="0.8" />
                    <path d="M7 32 C20 25, 32 28, 42 35 S60 45, 71 40 S82 28, 95 33" fill="none" stroke="rgba(0,169,157,0.22)" strokeWidth="0.7" />
                    <path d="M5 52 C16 46, 27 48, 37 53 S56 67, 68 61 S84 50, 95 56" fill="none" stroke="rgba(41,171,226,0.18)" strokeWidth="0.65" />
                    <path d="M8 72 C21 66, 31 67, 43 73 S63 87, 80 80" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="1.3 1.5" strokeWidth="0.55" />
                    <path d="M14 20 C24 26, 31 31, 39 34 S58 39, 68 44 S82 50, 90 57" fill="none" stroke="rgba(255,180,120,0.28)" strokeWidth="0.45" />
                    <ellipse cx="28" cy="43" rx="10" ry="8" fill="rgba(57,181,74,0.15)" />
                    <ellipse cx="74" cy="56" rx="12" ry="16" fill="rgba(255,255,255,0.06)" />
                    <path d="M16 68 C29 60, 39 60, 50 63 S71 69, 86 63" fill="none" stroke="rgba(255,215,170,0.42)" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-[11px] text-slate-300 shadow-soft backdrop-blur">
                  <p className="uppercase tracking-[0.2em] text-slate-400">Escala</p>
                  <p className="mt-1 text-white">0 - 2 km referenciales</p>
                </div>

                <div className="absolute left-5 top-[4.75rem] rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-[11px] text-slate-300 shadow-soft backdrop-blur">
                  <p className="uppercase tracking-[0.2em] text-slate-400">Norte</p>
                  <p className="mt-1 text-white">↑ San Pedro / Tambillo</p>
                </div>

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
                          isSelected ? "bg-emerald-400/55" : "bg-slate-400/15"
                        }`}
                      />
                      <span
                        className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-lg transition ${
                          isSelected
                            ? "border-emerald-300 bg-emerald-400 text-slate-950 scale-110"
                            : "border-white/45 bg-slate-950/90 text-slate-200 group-hover:border-emerald-300 group-hover:text-emerald-200"
                        }`}
                      >
                        <MapPin size={16} fill="currentColor" />
                      </span>
                      <span
                        className={`absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] shadow-soft backdrop-blur ${
                          isSelected
                            ? "border-emerald-300/30 bg-emerald-400/15 text-emerald-100"
                            : "border-white/10 bg-slate-950/75 text-slate-200"
                        }`}
                      >
                        {point.name}
                      </span>
                    </button>
                  );
                })}

                <div className="absolute left-1/2 top-1/2 w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-emerald-400/15 bg-emerald-400/10 px-5 py-4 text-center shadow-soft backdrop-blur">
                  <p className="text-lg font-semibold text-white">{selectedPoint.name}</p>
                  <p className="mt-1 text-sm text-emerald-100/85">{selectedPoint.type} · monitoreo ecosistémico</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-300">Coord. referencial editable</p>
                </div>

                <div className="absolute bottom-5 left-5 right-5 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-slate-300 shadow-soft backdrop-blur">
                    <p className="font-medium text-white">Leyenda</p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        Punto seleccionado
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                        Punto secundario
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                        Corredor de monitoreo
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
                        Ruta / acceso
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-slate-300 shadow-soft backdrop-blur">
                    <p className="uppercase tracking-[0.2em] text-slate-400">Coordenadas base</p>
                    <p className="mt-1 text-white">-23.05, -68.18</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-100">
                <span className="font-medium">Referencia de implementación:</span> Leaflet + OpenStreetMap, datos mock en
                `src/data/biodiversityGeoData.ts`, marcador editable para Bosque del Tambillo.
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
                <p className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${pointTone[selectedPoint.priority]}`}>
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
                  <div key={kpi.label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
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
