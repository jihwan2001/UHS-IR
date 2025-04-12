import { BoardDataProps } from "./model";
import { Container } from "./styles";

interface AnnouncementProps {
  report: BoardDataProps; // ✅ 대체됨
}

export const AnnouncementContents = ({ report }: AnnouncementProps) => {
  return (
    <Container>
      <h1>{report.boardTitle}</h1>
      <p>
        {report.userName} {report.boardDate}
      </p>
      <div>
        {report.boardDescription} {/* ✅ 내용 출력 */}
      </div>
    </Container>
  );
};
