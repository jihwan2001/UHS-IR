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
  removeFile: (index: number) => void;
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
    {/* ✅ 항상 label은 유지하되, 텍스트만 조건부 */}
    <UploadLabel htmlFor="fileUpload" $dragOver={dragOver}>
      {selectedFiles.length === 0
        ? "엑셀 파일을 업로드 하세요."
        : "추가로 업로드하려면 클릭하세요."}
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

    {/* ✅ 업로드된 파일 목록 */}
    {selectedFiles.length > 0 && (
      <FileListDisplay files={selectedFiles} onRemove={removeFile} />
    )}
  </Container>
);
