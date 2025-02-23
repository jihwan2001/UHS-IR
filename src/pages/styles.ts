import styled from "styled-components";

export const Container = styled.div<{ isFixedHeight?: boolean }>`
  height: ${({ isFixedHeight }) => (isFixedHeight ? "1080px" : "auto")};
  padding-top: 80px;
  display: flex;
  flex-direction: column;
`;

export const Contents = styled.div`
  padding: 0 180px;
`;

export const Name = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  margin: 60px 0;
`;
export const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 화면 높이의 100% */
  width: 100%;
`;
