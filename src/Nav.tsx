import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import symbolMark from "./img/symbolMark.png";
import loginPic from "./img/login.png";
import SchoolteacherDb from "./navBarsDropDown/SchoolteacherDb";
import StudentDb from "./navBarsDropDown/StudentDb";
import Introduce from "./navBarsDropDown/IntroduceRouter";
import ManagementDb from "./navBarsDropDown/ManagementDb";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  font-weight: bold;
  border-bottom: 1px solid black;
  height: 100px;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  color: #0f2280;
  text-decoration: none;
  span {
    font-size: 32px;
  }
`;

const MainLogo = styled.div`
  background-image: url(${symbolMark});
  background-size: cover;
  background-position: center;
  width: 70px;
  height: 70px;
  margin-right: 10px;
`;

const Menus = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  gap: 20px;
  font-size: 24px;
`;

interface MenuItemProps {
  active: boolean;
}

const MenuItem = styled.div<MenuItemProps>`
  position: relative;
  margin: 0;
  width: 220px;
  padding: 2.4rem;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#0f2280" : "transparent")};
  p {
    text-align: center;
    color: ${(props) => (props.active ? "white" : "black")};
  }
  &:hover {
    transition: 0.5s ease;
    background-color: #0f2280;
    p {
      color: white;
    }
  }
`;

interface DropdownMenuProps {
  visible: boolean;
}

const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 100%;
  left: 0;
  padding: 10px;
  background-color: white;
  border: none;
  font-size: 17px;
  z-index: 1000;
  width: 220px;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const Login = styled.div`
  background-color: #0f2280;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LoginImage = styled.img`
  width: 40%;
  height: 40%;
`;

const Nav: React.FC = () => {
  const [introduceMenu, setIntroduceMenu] = useState(false);
  const [studentDbMenu, setStudentDbMenu] = useState(false);
  const [teacherDbMenu, setTeacherDbMenu] = useState(false);
  const [managementMenu, setManagementMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".menu-item")) {
        setIntroduceMenu(false);
        setStudentDbMenu(false);
        setTeacherDbMenu(false);
        setManagementMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleIntroduceMenu = () => {
    setIntroduceMenu((prev) => !prev);
    setStudentDbMenu(false);
    setTeacherDbMenu(false);
    setManagementMenu(false);
  };

  const toggleStudentDbMenu = () => {
    setIntroduceMenu(false);
    setStudentDbMenu((prev) => !prev);
    setTeacherDbMenu(false);
    setManagementMenu(false);
  };

  const toggleTeacherDbMenu = () => {
    setIntroduceMenu(false);
    setStudentDbMenu(false);
    setTeacherDbMenu((prev) => !prev);
    setManagementMenu(false);
  };

  const toggleManagementMenu = () => {
    setIntroduceMenu(false);
    setStudentDbMenu(false);
    setTeacherDbMenu(false);
    setManagementMenu((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Main>
            <MainLogo />
            <span>UHS IR</span>
          </Main>
        </Link>
        <Menus>
          <MenuItem
            className="menu-item"
            onClick={toggleIntroduceMenu}
            active={introduceMenu}
          >
            <p>센터 소개</p>
            <DropdownMenu visible={introduceMenu}>
              <Introduce />
            </DropdownMenu>
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={toggleStudentDbMenu}
            active={studentDbMenu}
          >
            <p>학생 DB</p>
            <DropdownMenu visible={studentDbMenu}>
              <StudentDb />
            </DropdownMenu>
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={toggleTeacherDbMenu}
            active={teacherDbMenu}
          >
            <p>교원 DB</p>
            <DropdownMenu visible={teacherDbMenu}>
              <SchoolteacherDb />
            </DropdownMenu>
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={toggleManagementMenu}
            active={managementMenu}
          >
            <p>경영 DB</p>
            <DropdownMenu visible={managementMenu}>
              <ManagementDb />
            </DropdownMenu>
          </MenuItem>
        </Menus>
        <Login>
          <LoginImage src={loginPic} alt="Login" />
        </Login>
      </Container>
    </>
  );
};

export default Nav;
