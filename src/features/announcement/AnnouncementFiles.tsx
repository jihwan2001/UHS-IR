import { FileContainer, FileContents } from "./styles";

interface FileProps {
  files: { fileId: number; fileName: string }[];
}

export const AnnouncementFiles = ({ files }: FileProps) => {
  const handleDownload = async (fileId: number, fileName: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/main/board/files/download/${fileId}`);
      if (!response.ok) throw new Error("파일 다운로드 실패");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
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
        <FileContents key={file.fileId} onClick={() => handleDownload(file.fileId, file.fileName)}>
          {file.fileName}
        </FileContents>
      ))}
    </FileContainer>
  );
};
