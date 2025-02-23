import { Container } from "./styles";
import { Announcement } from "../../entities/announcement/model";

interface AnnouncementProps {
  report: Announcement;
}

export const AnnouncementContents = ({ report }: AnnouncementProps) => {
  return (
    <Container>
      <h1>{report.title}</h1>
      <p>작성일: {report.date}</p>
    </Container>
  );
};
