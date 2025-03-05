import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;
export const Content = styled.div`
  /* flex: 1; */
  margin: 3rem;
  overflow-y: auto; /* 스크롤 가능 */

  /* align-items: center; */
`;
export const FileName = styled.p`
  font-size: 2.25rem;
  margin-bottom: 3rem;
`;
export const FormContainer = styled.div`
  width: 70vw;
  max-width: 100%;
  margin: 0 auto;
`;

export const FormWrapper = styled.div`
  width: 100%;
  font-size: 24px;
`;
