import { useState } from "react";
import { Form, Input, LoginButton } from "../styles";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p> 로그인</p>
      <Input
        type="email"
        placeholder="학번 또는 교원 번호를 입력해주세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton type="submit">접속하기</LoginButton>
    </Form>
  );
};
