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
      <Name>센터 소개</Name>
      <NavList>
        <NavItem>
          <StyledLink
            to="/introduce/goal"
            isActive={location.pathname === "/introduce/goal"}
          >
            • 목표
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="/introduce/organChart"
            isActive={location.pathname === "/introduce/organChart"}
          >
            • 조직도
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="/introduce/road"
            isActive={location.pathname === "/introduce/road"}
          >
            • 오시는 길
          </StyledLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export { Body, Line, Underline, Content, Navigation };
