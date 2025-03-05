import React, { useState } from "react";
import {
  FileItem,
  FilesContainer,
  Folder,
  LogoFlex,
  SidebarContainer,
  SidebarContents,
} from "./styles";
import { Logo } from "../../shared/ui/Logo";
import linkIcon from "../../img/linkIcon.png";
import { Link, useLocation } from "react-router-dom";
import { MenuDatas } from "../../entities";

// ✅ 메뉴 데이터 변환 (올바른 타입 유지)
const formattedMenuData = MenuDatas.map((menu) => ({
  ...menu,
  children: menu.children.map((child) => ({
    name: child.name, // ✅ name 유지
    no: child.id, // ✅ id를 no로 변환
  })),
}));

export const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  return (
    <SidebarContainer>
      <LogoFlex>
        <Logo fontSize={"2rem"} logoSize={"4rem"} />
      </LogoFlex>
      <SidebarContents>
        {formattedMenuData.map((menu, index) => (
          <div key={index}>
            {menu.title === "공식 사이트 이동" ? (
              <Link
                to="/"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Folder>
                  <img src={linkIcon} alt="Link Icon" width="18" height="18" />{" "}
                  {menu.title}
                </Folder>
              </Link>
            ) : (
              <Folder onClick={() => toggleMenu(menu.title)}>
                📂 {menu.title}
              </Folder>
            )}
            {openMenu === menu.title && (
              <FilesContainer>
                {menu.children.map((child, subIndex) => {
                  const isActive =
                    location.pathname === `/datacenter/${child.no}` ||
                    location.pathname === `/datacenter/${child.no}/add` ||
                    location.pathname === `/datacenter/${child.no}/detail`;

                  return (
                    <FileItem key={subIndex} isActive={isActive}>
                      <Link
                        to={`/datacenter/${child.no}`}
                        style={{
                          textDecoration: "none",
                          color: isActive ? "#0f2280" : "inherit",
                          fontWeight: isActive ? "bold" : "normal",
                        }}
                      >
                        • {child.name}
                      </Link>
                    </FileItem>
                  );
                })}
              </FilesContainer>
            )}
          </div>
        ))}
      </SidebarContents>
    </SidebarContainer>
  );
};
