import { Link } from "react-router-dom";
import styled from "styled-components";
import symbolMark from "../img/symbolMark.png";
import loginPic from "../img/login.png";

import { useState, useCallback } from "react";

const Nav = styled.div`
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

const Body = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
`;

const MenuContainer = styled.div`
  max-width: 320px;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const ExcelsContainer = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
`;

function AdminPage() {
  const [excels, setExcels] = useState<boolean>(false);
  const [mainMenus, setMainMenus] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const [showExcel, setShowExcel] = useState(false); // 화면에 엑셀 출력
  const handleSetExels = useCallback((value: boolean) => {
    setExcels(value);
  }, []);

  return (
    <>
      <Nav>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Main>
            <MainLogo />
            <span>UHS IR Admin account</span>
          </Main>
        </Link>

        <Login aria-label="Login button">
          <LoginImage src={loginPic} alt="Login" />
        </Login>
      </Nav>
      <Body></Body>
    </>
  );
}

export default AdminPage;
