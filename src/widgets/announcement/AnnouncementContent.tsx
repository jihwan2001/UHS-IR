import {
  AnnouncementBackBtn,
  AnnouncementContents,
  AnnouncementFiles,
} from "../../features";
import { Announcement } from "../../entities/announcement/model";

interface AnnouncementProps {
  report: Announcement;
  setContentsClick: (value: boolean) => void;
}

// 공지사항 글을 클릭하면 보이는 페이지
export const AnnouncementContent = ({
  report,
  setContentsClick,
}: AnnouncementProps) => {
  return (
    <>
      <AnnouncementContents report={report} />
      <AnnouncementFiles />
      <AnnouncementBackBtn onClick={() => setContentsClick(false)} />
    </>
  );
};
