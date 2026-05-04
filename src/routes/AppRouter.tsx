import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";

const HomePage = lazy(() => import("../pages/HomePage").then((module) => ({ default: module.HomePage })));
const GeneralResultsPage = lazy(() =>
  import("../pages/GeneralResultsPage").then((module) => ({ default: module.GeneralResultsPage })),
);
const Scope1Page = lazy(() => import("../pages/Scope1Page").then((module) => ({ default: module.Scope1Page })));
const Scope2Page = lazy(() => import("../pages/Scope2Page").then((module) => ({ default: module.Scope2Page })));
const Scope3Page = lazy(() => import("../pages/Scope3Page").then((module) => ({ default: module.Scope3Page })));
const BiodiversityPage = lazy(() =>
  import("../pages/BiodiversityPage").then((module) => ({ default: module.BiodiversityPage })),
);

function PageFallback() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-slate-300">
      Cargando vista...
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route index element={<HomePage />} />
            <Route path="resultados-generales" element={<GeneralResultsPage />} />
            <Route path="scope1" element={<Scope1Page />} />
            <Route path="scope2" element={<Scope2Page />} />
            <Route path="scope3" element={<Scope3Page />} />
            <Route path="biodiversidad" element={<BiodiversityPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
