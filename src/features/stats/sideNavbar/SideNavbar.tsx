import { useState } from "react";
import { NavItem, CategoryButton, SubMenu, SideNav } from "./styles";
import { universityData } from "./universityData";
import rightArrow from "../../../img/rightArrow.png";
import downArrow from "../../../img/downArrow.png";

export const SideNavbar = () => {
  // 현재 열려 있는 카테고리를 관리하는 상태
  const [openCategory, setOpenCategory] = useState("");
  // universityData[0].category

  const toggleCategory = (category: any) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <SideNav>
      {universityData.map((category, index) => (
        <NavItem key={index}>
          {/* 📌 카테고리 버튼 (클릭 시 토글) */}
          <CategoryButton
            onClick={() => toggleCategory(category.category)}
            isOpen={openCategory === category.category}
          >
            <span>
              {index + 1}. {category.category}
            </span>
            {openCategory === category.category ? (
              <img src={downArrow} alt="arrow" />
            ) : (
              <img src={rightArrow} alt="arrow" />
            )}
          </CategoryButton>

          {/* 📌 선택된 카테고리의 서브 메뉴 표시 */}
          {openCategory === category.category && (
            <SubMenu>
              <ul>
                {category.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </SubMenu>
          )}
        </NavItem>
      ))}
    </SideNav>
  );
};
