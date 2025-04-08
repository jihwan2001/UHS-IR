import { useState } from "react";

import { NotFound } from "../../pages";
import { EduCompetency, FinStatus, StuPerformance } from "..";
import { NavContainer, NavItem } from "./styles";
import { aiNavs } from "./model";

export const AiAnalysis = () => {
  const [clicked, setClicked] = useState("재정 상태 그룹");

  const renderContent = () => {
    switch (clicked) {
      case "재정 상태 그룹":
        return <FinStatus />;
      case "학생 성과 그룹":
        return <StuPerformance />;
      case "교육 역량 그룹":
        return <EduCompetency />;
      default:
        return <NotFound />;
    }
  };

  return (
    <>
      <NavContainer>
        {aiNavs.map((nav) => (
          <>
            <NavItem
              key={nav}
              onClick={() => setClicked(nav)}
              className={clicked === nav ? "active" : ""}
            >
              {nav}
            </NavItem>
          </>
        ))}
      </NavContainer>

      {renderContent()}
    </>
  );
};
