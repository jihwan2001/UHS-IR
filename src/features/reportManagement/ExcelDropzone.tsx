import React from "react";
import { UploadLabel, Container } from "../../widgets/reportManagement/styles";
import { FileListDisplay } from "./FileListDisplay";

interface ExcelDropzoneProps {
  dragOver: boolean;
  selectedFiles: File[];
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (e: number) => void;
}

export const ExcelDropzone = ({
  dragOver,
  selectedFiles,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
  removeFile,
}: ExcelDropzoneProps) => (
  <Container
    $dragOver={dragOver}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    <UploadLabel htmlFor="fileUpload" $dragOver={dragOver}>
      엑셀 파일을 업로드 하세요.
    </UploadLabel>

    <input
      type="file"
      multiple
      accept=".xls,.xlsx,.csv"
      style={{ display: "none" }}
      id="fileUpload"
      onChange={onFileChange}
      aria-label="엑셀 파일 업로드"
    />
    <FileListDisplay files={selectedFiles} onRemove={removeFile} />
  </Container>
);
