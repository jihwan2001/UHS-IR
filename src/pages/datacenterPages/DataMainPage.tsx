import { Outlet } from "react-router-dom";
import { Sidebar } from "../../widgets";
import { Container, Content } from "./styles";

export const DataMainPage = () => {
  return (
    <Container>
      {/* 왼쪽 사이드바 */}
      <Sidebar />

      {/* 선택한 메뉴에 따라 바뀌는 메인 컨텐츠 */}
      <Content>
        <Outlet /> {/* 하위 페이지가 여기에 렌더링됨 */}
      </Content>
    </Container>
  );
};
