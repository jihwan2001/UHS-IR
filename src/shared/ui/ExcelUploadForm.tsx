// ExcelUploadForm.tsx
import React, { useCallback, useState } from "react";
import { ExcelDropzone } from "../../features";
import { SubmitButton } from "../../widgets/notices/styles";
import { GroupNameInput } from "../../widgets/reportManagement/styles";

interface ExcelUploadFormProps {
  onSubmit: (files: File[], extra?: string) => Promise<void>;
  requireGroupName?: boolean;
  submitLabel?: string;
}

export const ExcelUploadForm = ({
  onSubmit,
  requireGroupName = false,
  submitLabel = "제출",
}: ExcelUploadFormProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [groupName, setGroupName] = useState("");

  const filterExcelFiles = (files: File[]) =>
    files.filter((file) =>
      [".xls", ".xlsx", ".csv"].some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      )
    );

  const mergeUniqueFiles = (current: File[], incoming: File[]) => {
    const map = new Map(
      current.map((file) => [file.name + file.lastModified, file])
    );
    incoming.forEach((file) => {
      map.set(file.name + file.lastModified, file);
    });
    return Array.from(map.values());
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const excelFiles = filterExcelFiles(files);

    if (excelFiles.length === 0) {
      alert("엑셀 파일만 업로드할 수 있습니다.");
      return;
    }

    setSelectedFiles(excelFiles);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const excelFiles = filterExcelFiles(files);

    if (excelFiles.length === 0) {
      alert("엑셀 파일만 업로드할 수 있습니다.");
      return;
    }

    setSelectedFiles((prev) => mergeUniqueFiles(prev, excelFiles));
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      alert("파일을 업로드해 주세요.");
      return;
    }

    const trimmedGroup = groupName.trim();
    if (requireGroupName && !trimmedGroup) {
      alert("그룹 이름을 작성해 주세요.");
      return;
    }

    await onSubmit(selectedFiles, trimmedGroup);
    setSelectedFiles([]);
    setGroupName("");
  };

  return (
    <>
      <ExcelDropzone
        dragOver={dragOver}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onFileChange={handleFileChange}
        selectedFiles={selectedFiles}
        removeFile={removeFile}
      />

      {requireGroupName && (
        <GroupNameInput
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="그룹 이름 입력"
        />
      )}

      <SubmitButton type="button" onClick={handleSubmit}>
        {submitLabel}
      </SubmitButton>
    </>
  );
};
