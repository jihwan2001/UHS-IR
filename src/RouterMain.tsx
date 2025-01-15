import { Route, Routes, useLocation } from "react-router-dom";
import MainScreen from "./routes/MainScreen";
import AdminPage from "./adminPages/AdminPage";
import EnrollmentStatus from "./adminPages/first/EnrollmentStatus";
import Footer from "./Footer";
import UserPermissions from "./adminPages/fifth/UserPermissions";
import WebsiteNoticeSettings from "./adminPages/fourth/WebsiteNoticeSettings";
import AcademicPerformance from "./adminPages/second/AcademicPerformance";
import CompetitionResults from "./adminPages/second/CompetitionResults";
import ProgramParticipation from "./adminPages/second/ProgramParticipation";
import StudentExperience from "./adminPages/second/StudentExperience";
import ComplaintsManagement from "./adminPages/third/ComplaintsManagement";
import Notices from "./adminPages/third/Notices";
import ReportManagement from "./adminPages/third/ReportManagement";
import ScheduleManagement from "./adminPages/third/ScheduleManagement";
import Nav from "./Nav";
import NoticesAdd from "./adminPages/third/NoticesAdd";
import Goal from "./navBarsDropDown/tabsIntroduce/Goal";
import OrganChart from "./navBarsDropDown/tabsIntroduce/OrganChart";
import Road from "./navBarsDropDown/tabsIntroduce/Road";
import Scholarship from "./navBarsDropDown/tabsManagementDb/Scholarship";
import DropOutRate from "./navBarsDropDown/tabsStudentDb/DropOutRate";
import EmploymentRate from "./navBarsDropDown/tabsStudentDb/EmploymentRate";
import FreshStuRate from "./navBarsDropDown/tabsStudentDb/FreshStuRate";
import StudentsRate from "./navBarsDropDown/tabsStudentDb/StudentsRate";
import Research from "./navBarsDropDown/tabsTeacherDb/Research";
import TeacherPerStu from "./navBarsDropDown/tabsTeacherDb/TeacherPerStu";

function RouterMain() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/adminPage");

  return (
    <>
      {/* Nav는 AdminPage가 아닐 때만 렌더링 */}
      {!isAdminPage && <Nav />}

      <Routes>
        {/* 관리자 페이지 */}
        <Route path="/adminPage" element={<AdminPage />}>
          {/* 기본 라우트로 EnrollmentStatus 설정 */}
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

          <Route
            path="WebsiteNoticeSettings"
            element={<WebsiteNoticeSettings />}
          />

          <Route path="UserPermissions" element={<UserPermissions />} />
        </Route>
        {/* 일반 페이지 */}
        <Route path="/introduce/Goal" element={<Goal />} />
        <Route path="/introduce/organChart" element={<OrganChart />} />
        <Route path="/introduce/road" element={<Road />} />
        <Route path="/studentDB/freshStuRate" element={<FreshStuRate />} />
        <Route path="/studentDB/studentsRate" element={<StudentsRate />} />
        <Route path="/studentDB/employmentRate" element={<EmploymentRate />} />
        <Route path="/studentDB/dropOutRate" element={<DropOutRate />} />
        <Route path="/teacherDB/Research" element={<Research />} />
        <Route path="/teacherDB/teacherPerStu" element={<TeacherPerStu />} />
        <Route path="/managementDB/scholarship" element={<Scholarship />} />
        <Route path="/" element={<MainScreen />} />
      </Routes>

      <Footer />
    </>
  );
}

export default RouterMain;
