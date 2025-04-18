import styled from "styled-components";

export const ChartRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
`;

export const Description = styled.div`
  flex: 1;
  font-size: 1.3rem;
  line-height: 1.4;
  color: #333;
  p:first-child {
    font-weight: bold;
  }
`;
