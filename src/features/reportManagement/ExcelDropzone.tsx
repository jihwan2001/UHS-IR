import React from "react";
import { UploadLabel, Container } from "../../widgets/reportManagement/styles";

interface ExcelDropzoneProps {
  dragOver: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ExcelDropzone = ({
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
}: ExcelDropzoneProps) => (
  <Container
    dragOver={dragOver}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    <UploadLabel htmlFor="fileUpload" dragOver={dragOver}>
      엑셀 파일을 업로드 하세요.
    </UploadLabel>
    <input
      type="file"
      multiple
      accept=".xls,.xlsx,.csv"
      style={{ display: "none" }}
      id="fileUpload"
      onChange={onFileChange}
    />
  </Container>
);
