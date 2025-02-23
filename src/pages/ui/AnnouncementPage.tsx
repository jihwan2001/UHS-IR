import { AnnouncementList, SmallBanner } from "../../widgets";
import { Container, Contents } from "../styles";

// 공지사항 페이지
export const AnnouncementPage = () => {
  return (
    <Container>
      <SmallBanner />
      <Contents>
        <AnnouncementList />
      </Contents>
    </Container>
  );
};
