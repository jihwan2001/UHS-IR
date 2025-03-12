import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const PageButton = styled.button<{ isActive?: boolean }>`
  background: ${({ isActive }) => (isActive ? "#007bff" : "transparent")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#0056b3" : "#f0f0f0")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
