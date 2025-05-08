import { useState } from "react";
import { NavItem, CategoryButton, SubMenu, SideNav } from "./styles";
import rightArrow from "../../../img/rightArrow.png";
import downArrow from "../../../img/downArrow.png";
import { StatsSideNavbarProps } from "../types";

export const StatsSideNavbar = ({
  selectedItem,
  setSelectedItem,
  groupedData,
}: StatsSideNavbarProps) => {
  const [openCategory, setOpenCategory] = useState("");

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? "" : category);
  };

  return (
    <SideNav>
      {Object.entries(groupedData).map(([category, items], index) => (
        <NavItem key={index}>
          <CategoryButton
            onClick={() => toggleCategory(category)}
            isOpen={openCategory === category}
          >
            <span>
              {index + 1}. {category}
            </span>
            <img
              src={openCategory === category ? downArrow : rightArrow}
              alt="arrow"
            />
          </CategoryButton>

          {openCategory === category && (
            <SubMenu>
              <ul>
                {items.map((item, idx) => {
                  const isSelected =
                    selectedItem?.baseName === item.baseName &&
                    selectedItem?.groupName === item.groupName;

                  return (
                    <li
                      key={idx}
                      onClick={() => setSelectedItem(item)}
                      style={{
                        fontWeight: isSelected ? "bold" : "normal",
                        color: isSelected ? "#0f2280" : "#333",
                      }}
                    >
                      {item.baseName
                        .replace(/\.pdf$/i, "")
                        //.replace(/_\d{4}$/, "")
                        .replace(/_/g, " ")}
                    </li>
                  );
                })}
              </ul>
            </SubMenu>
          )}
        </NavItem>
      ))}
    </SideNav>
  );
};
