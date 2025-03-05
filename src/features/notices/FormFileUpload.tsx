import { useState } from "react";
import { UploadArea, FileList, FileItem, CancelIcon } from "./styles";
import cancelIcon from "../../img/cancel.png";

interface FormFileUploadProps {
  onFileSelect: (files: File[]) => void; // 여러 개의 파일을 부모 컴포넌트로 전달
}

export const FormFileUpload = ({ onFileSelect }: FormFileUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // 파일이 선택되었을 때
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const updatedFiles = [...selectedFiles, ...newFiles];
      setSelectedFiles(updatedFiles);
      onFileSelect(updatedFiles);
    }
  };

  // 드래그 앤 드롭 관련 이벤트 핸들러
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);
    onFileSelect(updatedFiles);
  };

  // 파일 삭제 함수
  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFileSelect(updatedFiles);
  };

  // 파일명과 확장자 표시
  const formatFileName = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    return `${file.name} `;
  };

  return (
    <UploadArea onDragOver={handleDragOver} onDrop={handleDrop}>
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        style={{ display: "none" }}
        id="fileUpload"
      />
      <label
        htmlFor="fileUpload"
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline",
        }}
      >
        파일 선택
      </label>

      <FileList>
        {selectedFiles.map((file, index) => (
          <FileItem key={index}>
            <span>{formatFileName(file)}</span>
            <CancelIcon
              src={cancelIcon}
              alt="삭제"
              onClick={() => removeFile(index)}
            />
          </FileItem>
        ))}
      </FileList>
    </UploadArea>
  );
};
