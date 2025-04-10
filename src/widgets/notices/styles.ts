import styled from "styled-components";

export const NoticeContainer = styled.div``;
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* ✅ 요소 간 간격 조정 */
  margin-bottom: 1.5rem;
  img {
    margin: 0 30px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* ✅ 요소 간격 조정 */
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width:70vw;
  max-width : 100%;
  overflow-x : hidden;

`;

export const Label = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const BtnGroup = styled.div`
  display: flex;
  gap: 0 20px;
  margin-top: 1rem;
`;
export const SubmitButton = styled.button`
  background-color: #0f2280;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.125rem;

  &:hover {
    background-color: rgb(9, 21, 80);
  }
`;
