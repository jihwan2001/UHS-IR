import React from "react";
import { useRecoilValue } from "recoil";
import { navMenuState } from "../atoms";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import symbolMark from "../img/symbolMark.png";
import loginPic from "../img/login.png";
import NavigationBar from "./NavigationBar";

// Styled components
const TopNav = styled.div`
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
  background-color: white;
  box-sizing: border-box;
`;

const BodyContent = styled.div`
  padding: 20px;
`;

const CurrentItem = styled.div`
  font-size: 26px;
  font-weight: 600;
`;

const Divider = styled.hr`
  /* width: 100%; */
  width: 1000px;
  max-width: 1300px; /* 고정 너비 설정 */
  height: 2px; /* 선 두께 */
  background-color: #ddd; /* 선 색상 */
  border: none; /* 기본 테두리 제거 */
  margin: 20px auto; /* 위아래 여백, 중앙 정렬 */
`;

function AdminPage() {
  const navMenus = useRecoilValue(navMenuState); // Recoil 상태 구독
  const location = useLocation(); // 현재 경로 가져오기

  const currentItem = navMenus
    .flatMap((menu) =>
      menu.eng.map((eng, index) =>
        location.pathname.endsWith(eng) ? menu.items[index] : null
      )
    )
    .filter((item) => item !== null)[0];
  return (
    <>
      {/* 상단 네비게이션 바 */}
      <TopNav>
        <Main>
          <MainLogo />
          <span>UHS IR Admin account</span>
        </Main>

        <Login aria-label="Login button">
          <LoginImage src={loginPic} alt="Login" />
        </Login>
      </TopNav>
      <Body>
        <NavigationBar />
        <BodyContent>
          {currentItem && <CurrentItem>{currentItem}</CurrentItem>}
          <Divider />
          <Outlet /> {/* 클릭된 메뉴의 콘텐츠가 이 위치에 렌더링 */}{" "}
        </BodyContent>
      </Body>
    </>
  );
}

export default AdminPage;
