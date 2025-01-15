import React from "react";
import { useRecoilValue } from "recoil";
import { navMenuState } from "../atoms";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// Styled components
const NavigationContainer = styled.div`
  width: 300px;
  min-height: 724px;
  padding: 20px;
  background-color: #f7f7f7;
  border-right: 1px solid #ddd;
`;

const MenuCategory = styled.div`
  margin-bottom: 20px;
`;

const MenuTitle = styled.h3`
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  font-size: 18px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li<{ isActive: boolean }>`
  margin-bottom: 8px;

  a {
    text-decoration: ${({ isActive }) => (isActive ? "underline" : "none")};
    color: ${({ isActive }) => (isActive ? "#000" : "#666")};
    font-size: 16px;

    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }
`;

const NavigationBar = () => {
  const navMenus = useRecoilValue(navMenuState); // Recoil 상태 구독
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <NavigationContainer>
      {navMenus.map((menu) => (
        <MenuCategory key={menu.title}>
          {/* 제목 */}
          <MenuTitle>{menu.title}</MenuTitle>

          {/* 메뉴 아이템 */}
          <MenuList>
            {menu.items.map((item, index) => {
              const menuPath = `/adminPage/${menu.eng[index]}`; // 메뉴의 URL
              const isActive = location.pathname === menuPath; // 현재 경로와 비교
              return (
                <MenuItem key={item} isActive={isActive}>
                  <Link to={menuPath}>{item}</Link>
                </MenuItem>
              );
            })}
          </MenuList>
        </MenuCategory>
      ))}
    </NavigationContainer>
  );
};

export default NavigationBar;
