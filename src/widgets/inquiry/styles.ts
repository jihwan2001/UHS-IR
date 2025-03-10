import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* ✅ 요소 간 간격을 최대로 벌림 */
  width: 100%; /* ✅ 부모 컨테이너 너비 설정 */
  margin-bottom: 1.5rem;
  img {
    margin: 0 30px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* ✅ 요소 간 간격 조정 */
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto; /* ✅ 오른쪽으로 밀어냄 */
`;
