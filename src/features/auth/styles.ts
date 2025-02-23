import styled from "styled-components";
import { Button } from "../../shared/ui/Button";

export const ButtonWrapper = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px; /* 아이콘과 텍스트 간격 */
  background: none;
  border: none;
  color: #0f2280;
  font-size: 16px;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 32px;
  height: 32px;
`;

// 로그인 폼
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 360px;
  height: 245px;
  margin: 0 auto;
  p {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
  color: white;
  background-color: #0f2280;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #091a60;
  }
`;
