import axios from "axios";
import { FileContainer, FileContents } from "./styles";

// 🔹 props가 배열이 아닐 수 있는 경우를 고려하여 기본값 제공
interface FileProps {
  files?: { fileId: number; fileName: string }[];
}

export const AnnouncementFiles = ({ files = [] }: FileProps) => {
  // 🔹 파일 다운로드 함수
  const handleDownload = async (fileId: number, fileName: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/main/board/files/download/${fileId}`,
        { responseType: "blob" } // 🔸 파일 다운로드 시 꼭 blob으로 설정
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

  // 🔸 렌더링
  return (
    <FileContainer>
      {Array.isArray(files) && files.length > 0 ? (
        files.map((file) => (
          <FileContents
            key={file.fileId}
            onClick={() => handleDownload(file.fileId, file.fileName)}
          >
            {file.fileName}
          </FileContents>
        ))
      ) : (
        <p>📁 첨부된 파일이 없습니다.</p>
      )}
    </FileContainer>
  );
};
