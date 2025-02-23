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

export const Column = styled.div<{ flexValue: number }>`
  flex: ${({ flexValue }) => flexValue || 1};

  text-align: left;
`;
