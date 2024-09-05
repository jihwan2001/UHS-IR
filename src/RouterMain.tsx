import { Route, Routes, useLocation } from "react-router-dom";
import MainScreen from "./routes/MainScreen";
import OrganChart from "./navBarsDropDown/tabsIntroduce/OrganChart";
import Road from "./navBarsDropDown/tabsIntroduce/Road";
import Goal from "./navBarsDropDown/tabsIntroduce/Goal";
import FreshStuRate from "./navBarsDropDown/tabsStudentDb/FreshStuRate";
import EmploymentRate from "./navBarsDropDown/tabsStudentDb/EmploymentRate";
import StudentsRate from "./navBarsDropDown/tabsStudentDb/StudentsRate";
import DropOutRate from "./navBarsDropDown/tabsStudentDb/DropOutRate";
import Research from "./navBarsDropDown/tabsTeacherDb/Research";
import TeacherPerStu from "./navBarsDropDown/tabsTeacherDb/TeacherPerStu";
import Scholarship from "./navBarsDropDown/tabsManagementDb/Scholarship";
import AdminPage from "./routes/AdminPage";
import Nav from "./Nav";
import Footer from "./Footer";
import ExcelUploader from "./routes/ExcelUploader";

function RouterMain() {
  const location = useLocation();
  const isAdminPage = location.pathname === "/adminPage";
  const isExels = location.pathname === "/exelspage";
  return (
    <>
      {/* Nav는 AdminPage가 아닐 때만 렌더링 */}
      {!isAdminPage && !isExels && <Nav />}

      <Routes>
        <Route
          path="/exelspage"
          element={
            <ExcelUploader
              item={""}
              year={""}
              mainMenus={""}
              showExcel={false}
              onLoadFile={function (filePath: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        <Route path="/adminPage" element={<AdminPage />} /> {/*관리자 페이지*/}
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
