import styled from "styled-components";
import { FadeLoader } from "react-spinners";

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Loading = () => {
  return (
    <LoadingWrapper>
      <h3>잠시만 기다려주세요.</h3>
      <FadeLoader color="#0F2280" />
    </LoadingWrapper>
  );
};
