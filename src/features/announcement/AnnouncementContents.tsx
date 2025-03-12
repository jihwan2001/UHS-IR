import { Container } from "./styles";
import { BoardDataProps } from "./types";

interface AnnouncementProps {
  report: BoardDataProps;
}

export const AnnouncementContents = ({ report }: AnnouncementProps) => {
  return (
    <Container>
      <h1>{report.boardTitle}</h1>
      <p>작성일: {report.boardDate}</p>
    </Container>
  );
};
