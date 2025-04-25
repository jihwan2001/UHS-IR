import React from "react";
import {
  CheckBox,
  Title,
  Input,
  ButtonGroup,
  Container,
  Button,
} from "./style";

interface PasswordCheckProps {
  okPw: string;
  setOkPw: React.Dispatch<React.SetStateAction<string>>;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordSubmit: () => void;
}

export const UserPasswordCheck: React.FC<PasswordCheckProps> = ({
  okPw,
  setOkPw,
  handlePasswordChange,
  handlePasswordSubmit,
}) => {
  return (
    <Container>
      <CheckBox>
        <Title>
          보안을 위해 한 번 더<br />
          비밀번호를 입력해주세요.
        </Title>
        <Input
          type="password"
          value={okPw}
          placeholder="비밀번호를 입력해주세요."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePasswordSubmit();
            }
          }}
          onChange={handlePasswordChange}
        />
        <ButtonGroup align="center">
          <Button type="button" onClick={handlePasswordSubmit}>
            확인
          </Button>
          <Button type="button" onClick={() => setOkPw("")}>
            취소
          </Button>
        </ButtonGroup>
      </CheckBox>
    </Container>
  );
};

export default UserPasswordCheck;
