import { LoginForm } from "../../features";
import { Container, LoginPageContainer } from "../styles";

// 로그인 페이지
export const LoginPage = () => {
  return (
    <Container isFixedHeight={true}>
      <LoginPageContainer>
        <LoginForm />
      </LoginPageContainer>
    </Container>
  );
};
