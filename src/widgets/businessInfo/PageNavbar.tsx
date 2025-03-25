import { useState } from "react";
import { NavContainer, NavItem } from "./styles";
import { AiAnalysis, DashBoard } from "..";
import { NotFound } from "../../pages";

export const PageNavbar = () => {
  const [clicked, setClicked] = useState("대시보드"); // 기본값 "대시보드"
  const Navs = ["대시보드", "AI 분석"];

  // 선택된 메뉴에 따라 렌더링할 컴포넌트 결정
  const renderContent = () => {
    switch (clicked) {
      case "대시보드":
        return <DashBoard />;
      case "AI 분석":
        return <AiAnalysis />;
      default:
        return <NotFound />;
    }
  };

  return (
    <>
      <NavContainer>
        {Navs.map((nav) => (
          <NavItem
            key={nav}
            onClick={() => setClicked(nav)}
            className={clicked === nav ? "active" : ""}
          >
            {nav}
          </NavItem>
        ))}
      </NavContainer>
      {renderContent()} {/* 선택된 메뉴에 해당하는 컴포넌트 렌더링 */}
    </>
  );
};
