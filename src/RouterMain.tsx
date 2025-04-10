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

function RouterMain() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/adminPage");
  const isDatacenter = location.pathname.startsWith("/datacenter");
  return (
    <>
      {/* Nav는 AdminPage가 아닐 때만 렌더링 */}
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

        {/* 데이터 센터 페이지 */}
        <Route>
          <Route path="/datacenter" element={<DataMainPage />}>
            <Route index element={<DataCenter />} />
            <Route path=":id/*" element={<DataCenter />} />{" "}
            {/* ✅ *을 사용해 하위 경로도 감지 */}
          </Route>
        </Route>

        {/* 일반 페이지 */}
      </Routes>

      <Footer />
    </>
  );
}

export default RouterMain;
