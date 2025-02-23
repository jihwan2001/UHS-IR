import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 120px;
  background-color: #0f2280;
  color: white;
  padding-left: 120px; /* X 좌표 조정 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 위에서부터 정렬 */
  text-align: left;
  position: relative;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 16px;
  position: absolute;
  left: 120px; /* 모든 요소 x=120 고정 */

  &:nth-child(1) {
    top: 19px; /* 첫 번째 텍스트 y=19 */
  }

  &:nth-child(2) {
    top: 50px; /* 두 번째 텍스트 y=50 */
  }

  &:nth-child(3) {
    top: 81px; /* 세 번째 텍스트 y=81 */
  }
`;
