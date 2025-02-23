import { Link } from "react-router-dom";
import styled from "styled-components";

// 드롭다운
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.div`
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 6px;
  color: black;

  &:hover {
    color: #0f2280;
    font-weight: bold;
  }
`;

export const DropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  left: 0;
  top: 100%;
  background-color: white;
  min-width: 200px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  border-radius: 4px;
  overflow: hidden;
`;

export const DropdownItem = styled(Link)`
  font-size: 18px;
  padding: 12px 16px;
  display: block;
  color: black;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #0f2280;
    font-weight: bold;
    background-color: #f1f1f1;
  }
`;

export const Slash = styled.p`
  align-items: center;
  display: flex;
`;

export const AdContainer = styled(DropdownButton)`
  display: flex;
  align-items: center;
`;
