import { Route, Routes, useLocation } from "react-router-dom";
import AdminPage from "./adminPages/AdminPage";
import EnrollmentStatus from "./adminPages/first/EnrollmentStatus";
import { Footer } from "./entities/footer";
import UserPermissions from "./adminPages/fifth/UserPermissions";
import AcademicPerformance from "./adminPages/second/AcademicPerformance";
import CompetitionResults from "./adminPages/second/CompetitionResults";
import ProgramParticipation from "./adminPages/second/ProgramParticipation";
import StudentExperience from "./adminPages/second/StudentExperience";
import ComplaintsManagement from "./adminPages/third/ComplaintsManagement";
import Notices from "./adminPages/third/Notices";
import ReportManagement from "./adminPages/third/ReportManagement";
import ScheduleManagement from "./adminPages/third/ScheduleManagement";

import ReportManagementPdf from "./adminPages/third/ReportManagementPdf";
import ReportPdfHistory from "./adminPages/third/ReportPdfHistory";
import ChatPage from "./adminPages/fourth/ChatPage";
import { Navbar } from "./widgets";
import {
  AnalysisReportsPage,
  AnnouncementPage,
  HomePage,
  Inquiry,
  IrOverviewPage,
  LoginPage,
  StatsYearbookPage,
} from "./pages";

function RouterMain() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/adminPage");

  return (
    <>
      {/* Nav는 AdminPage가 아닐 때만 렌더링 */}
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/ir-overview" element={<IrOverviewPage />} />
        <Route path="/stats-yearbook" element={<StatsYearbookPage />} />
        <Route path="/analysis-reports" element={<AnalysisReportsPage />} />
        <Route path="/announcement" element={<AnnouncementPage />} />
        <Route path="/inquiry" element={<Inquiry />} />

        {/* 관리자 페이지 */}
        <Route path="/adminPage" element={<AdminPage />}>
          {/* 기본 관리자 페이지 */}
          <Route index element={<EnrollmentStatus />} />
          <Route path="EnrollmentStatus" element={<EnrollmentStatus />} />

          <Route path="AcademicPerformance" element={<AcademicPerformance />} />
          <Route
            path="ProgramParticipation"
            element={<ProgramParticipation />}
          />
          <Route path="CompetitionResults" element={<CompetitionResults />} />
          <Route path="StudentExperience" element={<StudentExperience />} />

          <Route path="Notices" element={<Notices />} />
          <Route
            path="ComplaintsManagement"
            element={<ComplaintsManagement />}
          />
          <Route path="ScheduleManagement" element={<ScheduleManagement />} />
          <Route path="ReportManagement" element={<ReportManagement />} />
          <Route path="ReportManagementPdf" element={<ReportManagementPdf />} />

          {/* 🚀 `ReportPdfHistory`도 `adminPage` 하위에 위치하도록 변경 */}
          <Route path="ReportPdfHistory" element={<ReportPdfHistory />} />

          <Route path="ChatPage" element={<ChatPage />} />
          <Route path="UserPermissions" element={<UserPermissions />} />
        </Route>

        {/* 일반 페이지 */}
      </Routes>

      <Footer />
    </>
  );
}

export default RouterMain;
