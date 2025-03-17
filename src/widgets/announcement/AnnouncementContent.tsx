import {
  AnnouncementBackBtn,
  AnnouncementContents,
  AnnouncementFiles,
} from "../../features";
import { BoardDataProps } from "../../features/announcement/types";
import { useEffect, useState } from "react";

interface FileData {
  fileId: number;
  fileName: string;
}

interface AnnouncementProps {
  report: { boardId: number; boardTitle: string; boardDate: string };
  setContentsClick: (value: boolean) => void;
}

// 공지사항 글을 클릭하면 보이는 페이지
export const AnnouncementContent = ({ report, setContentsClick }: { report: BoardDataProps; setContentsClick: (value: boolean) => void }) => {
  const [files, setFiles] = useState<{ fileId: number; fileName: string }[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/main/board/files/${report.boardId}`)
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error("파일 목록 불러오기 실패:", err));

    fetch(`http://localhost:8080/api/main/board/view/${report.boardId}`, { method: "PUT" })
      .then((res) => res.text())
      .then((message) => console.log("조회수 증가:", message))
      .catch((err) => console.error("조회수 증가 실패:", err));
  }, [report.boardId]);
  
  return (
    <>
      <AnnouncementContents report={report} />
      <AnnouncementFiles files={files} />
      <AnnouncementBackBtn onClick={() => setContentsClick(false)} />
    </>
  );
};