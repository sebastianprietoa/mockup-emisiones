import { useEffect, useMemo, useState } from "react";
import { divIcon } from "leaflet";
import { Circle, MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { StatusBadge } from "../common/StatusBadge";
import { biodiversityGeoPoints, type BiodiversityGeoPoint } from "../../data/biodiversityGeoData";

const defaultSelectedPointId = "bosque-del-tambillo";

function getPointIcon(point: BiodiversityGeoPoint, active: boolean) {
  const size = active ? 28 : 20;
  const glow = active ? "0 0 0 10px rgba(52, 211, 153, 0.16)" : "0 0 0 8px rgba(15, 23, 42, 0.2)";

  return divIcon({
    className: "",
    html: `
      <div style="
        width:${size}px;
        height:${size}px;
        border-radius:9999px;
        background:${point.markerColor};
        border:2px solid rgba(255,255,255,0.92);
        box-shadow:${glow};
        position:relative;
      ">
        <div style="
          position:absolute;
          inset:${active ? 6 : 4}px;
          border-radius:9999px;
          background:rgba(255,255,255,0.26);
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function MapController({ point }: { point: BiodiversityGeoPoint }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([point.latitude, point.longitude], 12, {
      animate: true,
      duration: 0.85,
    });
  }, [map, point.latitude, point.longitude]);

  return null;
}

export function BiodiversityMap() {
  const [selectedId, setSelectedId] = useState(defaultSelectedPointId);

  const selectedPoint =
    useMemo(
      () => biodiversityGeoPoints.find((point) => point.id === selectedId) ?? biodiversityGeoPoints[0],
      [selectedId],
    ) ?? biodiversityGeoPoints[0];

  const selectedPosition = [selectedPoint.latitude, selectedPoint.longitude] as [number, number];

  const accessPath = useMemo<[number, number][]>(() => {
    const accessPoint = biodiversityGeoPoints.find((point) => point.id === "ruta-de-acceso");
    if (!accessPoint) return [selectedPosition];
    return [
      [accessPoint.latitude, accessPoint.longitude],
      [selectedPoint.latitude, selectedPoint.longitude],
    ];
  }, [selectedPoint.latitude, selectedPoint.longitude]);

  const corridorPath = useMemo<[number, number][]>(() => {
    const sanPedro = biodiversityGeoPoints.find((point) => point.id === "san-pedro-atacama");
    const transecto = biodiversityGeoPoints.find((point) => point.id === "transecto-de-aves");
    const zonaControl = biodiversityGeoPoints.find((point) => point.id === "zona-control");

    return [
      sanPedro ? [sanPedro.latitude, sanPedro.longitude] : selectedPosition,
      zonaControl ? [zonaControl.latitude, zonaControl.longitude] : selectedPosition,
      selectedPosition,
      transecto ? [transecto.latitude, transecto.longitude] : selectedPosition,
    ];
  }, [selectedPosition]);

  return (
    <section className="rounded-[32px] border border-emerald-500/10 bg-emerald-950/20 p-5 shadow-soft backdrop-blur">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Georreferencia de puntos de interés</h2>
          <p className="mt-1 text-sm text-slate-400">Mapa de monitoreo territorial integrado en Biodiversidad / TNFD.</p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Coordenadas referenciales y editables
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]">
        <div className="rounded-[30px] border border-white/10 bg-slate-950/55 p-4 shadow-soft">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-xs text-slate-200">
              Bosque del Tambillo
            </span>
            <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
              TNFD Territorial
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">
              5 puntos activos
            </span>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80">
            <div className="pointer-events-none absolute left-4 top-4 z-[500] flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-slate-200">
                Bosque del Tambillo · punto de interés
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-100">
                Mapa base OpenStreetMap
              </span>
            </div>

            <MapContainer
              center={selectedPosition}
              zoom={12}
              scrollWheelZoom={false}
              zoomControl
              className="h-[540px] w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapController point={selectedPoint} />

              <Polyline
                positions={corridorPath}
                pathOptions={{
                  color: "#34d399",
                  weight: 3,
                  opacity: 0.45,
                  dashArray: "10 10",
                }}
              />
              <Polyline
                positions={accessPath}
                pathOptions={{
                  color: "#fbbf24",
                  weight: 4,
                  opacity: 0.65,
                }}
              />

              <Circle
                center={selectedPosition}
                radius={1800}
                pathOptions={{
                  color: "#34d399",
                  fillColor: "#10b981",
                  fillOpacity: 0.12,
                  weight: 2,
                }}
              />

              {biodiversityGeoPoints.map((point) => (
                <Marker
                  key={point.id}
                  position={[point.latitude, point.longitude]}
                  icon={getPointIcon(point, point.id === selectedId)}
                  eventHandlers={{
                    click: () => setSelectedId(point.id),
                  }}
                >
                  <Tooltip permanent direction="top" offset={[0, -8]} className="biodiversity-tooltip">
                    {point.name}
                  </Tooltip>
                </Marker>
              ))}
            </MapContainer>

            <div className="pointer-events-none absolute inset-x-4 bottom-4 z-[500] flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="pointer-events-auto rounded-2xl border border-white/10 bg-slate-950/80 p-3 text-xs text-slate-300 shadow-soft backdrop-blur">
                <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Leyenda</div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Puntos de avistamiento", "#34d399"],
                    ["Transectos de monitoreo", "#f59e0b"],
                    ["Zonas sensibles", "#14b8a6"],
                    ["Área de influencia", "#38bdf8"],
                  ].map(([label, color]) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pointer-events-auto rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 shadow-soft backdrop-blur">
                <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Referencia</div>
                <div className="mt-1 max-w-xs">
                  Leaflet + OpenStreetMap, datos mock en <span className="text-slate-100">src/data/biodiversityGeoData.ts</span>.
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Nota: coordenadas y capas pueden ajustarse en terreno o a partir de validación cartográfica.
          </p>
        </div>

        <aside className="rounded-[30px] border border-emerald-500/15 bg-slate-950/60 p-4 shadow-soft">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-300">Ficha del punto</div>
              <h3 className="mt-2 text-2xl font-semibold text-white">{selectedPoint.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{selectedPoint.locationLabel}</p>
            </div>
            <StatusBadge tone={selectedPoint.status} />
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Tipo de ecosistema</div>
              <div className="mt-1 text-sm font-semibold text-slate-100">{selectedPoint.ecosystemType}</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Tipo</div>
                <div className="mt-1 text-sm font-semibold text-slate-100">{selectedPoint.type}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Prioridad TNFD</div>
                <div className="mt-1 text-sm font-semibold text-slate-100">{selectedPoint.priority}</div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Coordenadas</div>
              <div className="mt-1 text-sm font-semibold text-slate-100">
                {selectedPoint.latitude.toFixed(2)}, {selectedPoint.longitude.toFixed(2)}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Descripción</div>
              <p className="mt-1 text-sm leading-relaxed text-slate-200">{selectedPoint.description}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">KPIs asociados</div>
              <div className="mt-3 space-y-2">
                {selectedPoint.kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
                  >
                    <span className="text-sm text-slate-300">{kpi.label}</span>
                    <span className="text-sm font-semibold text-white">{kpi.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Capas sugeridas</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedPoint.layers.map((layer) => (
                  <span
                    key={layer}
                    className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100"
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

