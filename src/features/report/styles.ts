import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  margin: auto;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  border-radius: 4px;
  overflow: hidden;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  &:first-child:hover {
    pointer-events: none;
  }

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const Header = styled(Row)`
  background-color: #f5f5f5;
  font-size: 24px;
  font-weight: 500;
`;

export const Column = styled.div<{ flexValue: number; textPosition?: string }>`
  flex: ${({ flexValue }) => flexValue || 1};

  text-align: ${({ textPosition }) => textPosition || "center"};
`;

export const Notice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f2280;
  font-size: 1.125rem;
  font-weight: bold;
  border: 2px solid #0f2280;
  border-radius: 100px;
  width: 4.375rem;
  height: 2.188rem;
`;
