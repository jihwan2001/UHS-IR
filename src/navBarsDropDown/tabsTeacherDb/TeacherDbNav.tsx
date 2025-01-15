import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import FolderExplorer from "../../FolderExplorer";

// 스타일 정의
const Body = styled.div`
  height: 724px;
  display: flex;
  background-color: #f5f5f5;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 80px;
  margin-top: 80px;
  width: 200px;
  height: 240px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-weight: bold;
`;

const Name = styled.h1`
  font-size: 18px;
  background-color: #808080;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding-left: 10px;
  font-size: 16px;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NavItem = styled.li`
  padding: 5px 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "#0f2280" : "inherit")};
  text-decoration: none;
`;

const Line = styled.div`
  margin-top: 40px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #0f2280;
`;

const Underline = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
  margin: 10px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 35px;
`;

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6"><path fill="%230f2280" d="M0 0l5 5 5-5H0z"/></svg>')
    no-repeat right 0.75rem center;
  background-size: 0.65rem;
  border: none;
  color: #0f2280;
  font-size: 16px;
  font-weight: bold;
  padding: 0.5rem 0;
  padding-right: 2rem;
  margin-left: 0.5rem;
  cursor: pointer;
  outline: none;
`;

const SelectYear = styled.div`
  display: flex;
  align-items: center;
  color: #0f2280;
  font-size: 16px;
  font-weight: bold;

  div {
    margin-right: 0.5rem;
  }

  form {
    display: flex;
    align-items: center;
  }
`;

const Files = styled.div`
  width: 1000px;
  height: 290px;
  background-color: white;
  overflow: auto;
`;

// 데이터 타입 정의
interface IYear {
  year: string;
}

interface FolderData {
  fileId: string;
  filename: string;
  mimeType: string;
  children?: FolderData[];
}

interface FileProps {
  year: string;
  folderId: string;
  loading: boolean;
  children: React.ReactNode;
}

const File = ({ year, folderId, loading, children }: FileProps) => {
  return (
    <Files>
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          <div>현재 폴더 ID: {folderId}</div>
          {children}
        </>
      )}
    </Files>
  );
};

const Navigation = () => {
  const location = useLocation();

  return (
    <Nav>
      <Name>교원 DB</Name>
      <NavList>
        <NavItem>
          <StyledLink
            to="/teacherDB/Research"
            isActive={location.pathname === "/teacherDB/Research"}
          >
            • 전임교원 연구 실적
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="/teacherDB/teacherPerStu"
            isActive={location.pathname === "/teacherDB/teacherPerStu"}
          >
            • 전임교원 1인당 학생 수
          </StyledLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

const Year = () => {
  const [year, setYear] = useState<IYear>({ year: "" });
  const [folderId, setFolderId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const fetchFolderId = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/sheets");
        const data: FolderData[] = response.data;

        let folderName = "";

        switch (location.pathname) {
          case "/teacherDB/Research":
            folderName = "전임교원의 연구 실적 21~23";
            break;
          case "/teacherDB/teacherPerStu":
            folderName = "전임교원 1인당 학생 수 및 전임교원 확보율 21~23";
            break;
          default:
            break;
        }

        const folder = data.find((item) => item.filename === folderName);
        if (folder) {
          setFolderId(folder.fileId);
        }
      } catch (error) {
        console.error("폴더 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolderId();
  }, [location.pathname]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear({ year: event.target.value });
  };

  return (
    <>
      <SelectYear>
        <div>공시연도</div>
        <div>|</div>
        <form action="#">
          <Select onChange={handleChange}>
            <option value="" disabled selected>
              연도
            </option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </Select>
        </form>
      </SelectYear>
      <File year={year.year} folderId={folderId} loading={loading}>
        {!loading && folderId && <FolderExplorer initialFolderId={folderId} />}
      </File>
    </>
  );
};

export { Body, Line, Underline, Content, Navigation, Year };
