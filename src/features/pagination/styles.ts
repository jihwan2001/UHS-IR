import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const PageButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
`;
