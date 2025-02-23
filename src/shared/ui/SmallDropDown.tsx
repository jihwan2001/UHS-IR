import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DropDownButton,
  DropDownContainer,
  DropDownItem,
  DropDownMenu,
} from "../styles";

export const SmallDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // 현재 경로 확인

  const menuItems = [
    { path: "/ir-overview", label: "센터 소개" },
    { paths: ["/stats-yearbook", "/analysis-reports"], label: "대학 통계" },
    { paths: ["/announcement", "/inquiry"], label: "커뮤니티" },
  ];

  // 현재 페이지의 메뉴 찾기
  const currentItem = menuItems.find((item) =>
    item.path
      ? item.path === location.pathname
      : item.paths?.includes(location.pathname)
  );

  return (
    <DropDownContainer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <DropDownButton>
        <span>{currentItem ? currentItem.label : "메뉴 선택"}</span> &nbsp; ▼
      </DropDownButton>
      {isOpen && (
        <DropDownMenu>
          {menuItems.map((item) => {
            const targetPath = item.path || item.paths?.[0]; // 단일 경로 또는 첫 번째 경로 선택

            return (
              <DropDownItem
                key={targetPath}
                to={targetPath as string} // undefined 방지
                $disabled={location.pathname === targetPath} // 현재 페이지인지 확인
                onClick={(e) => {
                  if (location.pathname === targetPath) e.preventDefault(); // 클릭 방지
                }}
              >
                {item.label}
              </DropDownItem>
            );
          })}
        </DropDownMenu>
      )}
    </DropDownContainer>
  );
};
