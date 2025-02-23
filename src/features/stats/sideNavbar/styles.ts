import styled from "styled-components";

interface CategoryButtonProps {
  isOpen: boolean;
}

export const SideNav = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavItem = styled.div`
  width: 360px;
  margin-bottom: 8px;
`;

export const CategoryButton = styled.button<CategoryButtonProps>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  font-size: 18px;
  font-weight: bold;
  background-color: ${({ isOpen }) => (isOpen ? "#666" : "#fff")};
  color: ${({ isOpen }) => (isOpen ? "#fff" : "#333")};
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ccc;
  }
`;

export const SubMenu = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px 15px;
  margin-top: 5px;

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    font-size: 16px;
    padding: 5px 0;
    color: #333;
    cursor: pointer;
  }

  li:hover {
    color: #0f2280;
    font-weight: bold;
  }
`;

export const NavHeader = styled.div`
  width: 320px;
  background: #666666;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 15px;
  border-radius: 5px;
`;
