import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 0;
  font-size: 48px;
  font-weight: bold;
  gap: 20px; /* select와 텍스트 사이 간격 */
`;

export const Year = styled.select`
  font-size: 48px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 0 solid #666;
  background: white;
  color: #0f2280;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: #444;
  }
`;
