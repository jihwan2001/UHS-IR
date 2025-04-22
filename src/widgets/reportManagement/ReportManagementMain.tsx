import React, { useCallback, useState } from "react";
import { GroupNameInput } from "./styles";
import { SubmitButton } from "../notices/styles";
import { ExcelDropzone } from "../../features";
import { submitFiles } from "./hooks/useSubmitFiles";

export const ReportManagementMain = () => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [groupName, setGroupName] = useState("");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const filterExcelFiles = (files: File[]) =>
    files.filter((file) =>
      [".xls", ".xlsx", ".csv"].some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      )
    );

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

  // 파일 중복 업로드 방지
  const mergeUniqueFiles = (current: File[], incoming: File[]) => {
    const map = new Map(
      current.map((file) => [file.name + file.lastModified, file])
    );
    incoming.forEach((file) => {
      map.set(file.name + file.lastModified, file);
    });
    return Array.from(map.values());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const excelFiles = filterExcelFiles(files);

    if (excelFiles.length === 0) {
      alert("엑셀 파일만 업로드할 수 있습니다.");
      return;
    }

    setSelectedFiles((prev) => mergeUniqueFiles(prev, excelFiles));
    e.target.value = ""; // <-- 여기 추가
  };

  const removeFile = (index: number) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
  };

  const handleSubmit = async () => {
    const trimmedGroupName = groupName.trim();
    if (!trimmedGroupName) {
      alert("그룹 이름을 작성해 주세요.");
      return;
    }

    await submitFiles(selectedFiles, trimmedGroupName);
    setGroupName("");
    setSelectedFiles([]);
  };

  return (
    <>
      <ExcelDropzone
        dragOver={dragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onFileChange={handleFileChange}
        selectedFiles={selectedFiles}
        removeFile={removeFile}
      />

      <GroupNameInput
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="그룹 이름 입력"
      />

      <SubmitButton onClick={handleSubmit} type="button">
        제출
      </SubmitButton>
    </>
  );
};
