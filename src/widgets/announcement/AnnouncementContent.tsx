import {
  AnnouncementBackBtn,
  AnnouncementContents,
  AnnouncementFiles,
} from "../../features";
import { useEffect, useState } from "react";
import axios from "axios";
import { BoardDataProps } from "../../features/announcement/model";

interface AnnouncementContentProps {
  report: BoardDataProps;
  setContentsClick: (value: boolean) => void;
}

export const AnnouncementContent = ({
  report,
  setContentsClick,
}: AnnouncementContentProps) => {
  const [files, setFiles] = useState<{ fileId: number; fileName: string }[]>(
    []
  );

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/main/board/list/${report.boardId}`
        );
        setFiles(res.data);
      } catch (err) {
        console.error("파일 목록 불러오기 실패:", err);
      }
    };

    const increaseViewCount = async () => {
      try {
        const res = await axios.put(
          `http://localhost:8080/api/main/board/view/${report.boardId}`
        );
        console.log("조회수 증가:", res.data);
      } catch (err) {
        console.error("조회수 증가 실패:", err);
      }
    };

    fetchFiles();
    increaseViewCount();
  }, [report.boardId]);

  return (
    <>
      <AnnouncementContents report={report} />
      <AnnouncementFiles files={files} />
      <AnnouncementBackBtn onClick={() => setContentsClick(false)} />
    </>
  );
};
