import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./entities";
import { Navbar } from "./widgets";
import {
  AnalysisReportsPage,
  AnnouncementPage,
  DataCenter,
  DataMainPage,
  HomePage,
  Inquiry,
  IrOverviewPage,
  LoginPage,
  NotFound,
  StatsYearbookPage,
} from "./pages";
import { ProtectedRoute } from "./ProtectedRoute ";

export const RouterMain = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/adminPage");
  const isDatacenter = location.pathname.startsWith("/datacenter");

  return (
    <>
      {!isAdminPage && !isDatacenter && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/ir-overview" element={<IrOverviewPage />} />
        <Route path="/stats-yearbook" element={<StatsYearbookPage />} />
        <Route path="/analysis-reports" element={<AnalysisReportsPage />} />
        <Route path="/announcement" element={<AnnouncementPage />} />
        <Route path="/inquiry" element={<Inquiry />} />

        {/* 데이터 센터 페이지 → 권한 체크 추가 */}
        <Route
          path="/datacenter"
          element={
            // <ProtectedRoute allowedRoles={["IR_MANAGER", "ADMIN"]}>
            <DataMainPage />
            // </ProtectedRoute>
          }
        >
          <Route index element={<DataCenter />} />
          <Route path=":id/*" element={<DataCenter />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
};
