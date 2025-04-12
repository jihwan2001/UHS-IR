import axios from "axios";
import { FileContainer, FileContents } from "./styles";

interface FileProps {
  files: { fileId: number; fileName: string }[];
}

export const AnnouncementFiles = ({ files }: FileProps) => {
  const handleDownload = async (fileId: number, fileName: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/main/board/files/download/${fileId}`,
        { responseType: "blob" } // 중요: 파일을 blob 형식으로 받아야 함
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("다운로드 오류:", error);
    }
  };

  return (
    <FileContainer>
      {files.map((file) => (
        <FileContents
          key={file.fileId}
          onClick={() => handleDownload(file.fileId, file.fileName)}
        >
          {file.fileName}
        </FileContents>
      ))}
    </FileContainer>
  );
};
