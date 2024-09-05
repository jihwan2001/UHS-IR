import { ChangeEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

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
  flex-grow: 2; /* 리스트 항목이 더 많으므로 더 큰 비율로 설정 */
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
  margin-top: 80px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #0f2280;
`;

const Underline = styled.div`
  width: 1000px; /* 원하는 길이로 설정 */
  height: 1px; /* 두께를 조정할 수 있음 */
  background-color: black;
  margin: 10px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 35px;
`;

const Navigation = () => {
  const location = useLocation();

  return (
    <Nav>
      <Name>학생 DB</Name>
      <NavList>
        <NavItem>
          <StyledLink
            to="/studentDb/freshStuRate"
            isActive={location.pathname === "/studentDb/freshStuRate"}
          >
            • 신입생 충원율
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="/studentDb/studentsRate"
            isActive={location.pathname === "/studentDb/studentsRate"}
          >
            • 재학생 충원율
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="/studentDb/employmentRate"
            isActive={location.pathname === "/studentDb/employmentRate"}
          >
            • 취업률
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="/studentDb/dropOutRate"
            isActive={location.pathname === "/studentDb/dropOutRate"}
          >
            • 중도탈락률
          </StyledLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

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
  padding-right: 2rem; /* 화살표를 위한 여백 */
  margin-left: 0.5rem;
  cursor: pointer;
  outline: none; /* 포커스 시 나타나는 외곽선을 제거 */
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
  overflow: auto; /* 넘치는 콘텐츠에 대해 스크롤바를 추가 */
`;
interface IYear {
  year: string;
}

interface FileProps {
  year: string;
}

const File = ({ year }: FileProps) => {
  return (
    <Files>
      {/* 서버에서 받아온 엑셀 파일 목록을 이 div 안에 렌더링 */}
      <div>선택된 연도: {year}</div>
    </Files>
  );
};

const Year = () => {
  const [year, setYear] = useState<IYear>({ year: "" });

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
      <File year={year.year} />
    </>
  );
};
export { Body, Line, Underline, Content, Navigation, Year };
