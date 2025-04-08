import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Form, Input, LoginButton } from "../styles";

export const LoginForm = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, message } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ userAccount: account, userPw: password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p> 로그인</p>
      <Input
        type="number"
        placeholder="학번 또는 교원 번호를 입력해주세요."
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/*{error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}*/}
      <LoginButton type="submit" disabled={loading}>
        {loading ? "접속 중..." : "접속하기"}
      </LoginButton>
    </Form>
  );
};
