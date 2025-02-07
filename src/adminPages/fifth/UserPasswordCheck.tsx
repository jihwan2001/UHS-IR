import React from "react";
import UPcss from "./UPcss";

interface PasswordCheckProps {
  okPw: string;
  setOkPw: React.Dispatch<React.SetStateAction<string>>;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordSubmit: () => void;
}

const PasswordCheck: React.FC<PasswordCheckProps> = ({
  okPw,
  setOkPw,
  handlePasswordChange,
  handlePasswordSubmit,
}) => {
  return (
    <UPcss.Container>
      <UPcss.CheckBox>
        <UPcss.Title>
          보안을 위해 한 번 더<br />
          비밀번호를 입력해주세요.
        </UPcss.Title>
        <UPcss.Input
          type="password"
          value={okPw}
          placeholder="비밀번호를 입력해주세요."
          onChange={handlePasswordChange}
        />
        <UPcss.ButtonGroup align="center">
          <UPcss.Button type="button" onClick={handlePasswordSubmit}>
            확인
          </UPcss.Button>
          <UPcss.Button type="button" onClick={() => setOkPw("")}>
            취소
          </UPcss.Button>
        </UPcss.ButtonGroup>
      </UPcss.CheckBox>
    </UPcss.Container>
  );
};

export default PasswordCheck;
