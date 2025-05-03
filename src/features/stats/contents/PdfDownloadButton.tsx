import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { DownloadButton } from "./styles";
interface Props {
  baseName: string;
  groupName: string;
  year: number;
}

export const PdfDownloadButton = ({ baseName, groupName, year }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const fileName = `${baseName}_${year}.pdf`;
  const url = `http://localhost:8080/api/publicfile/download/pdf/${encodeURIComponent(
    groupName
  )}/${encodeURIComponent(fileName)}`;

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      toast.info("📥 다운로드를 시작합니다...", { autoClose: 1500 });

      const response = await axios.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
      toast.success("✅ 다운로드 완료!", { autoClose: 2000 });
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
      toast.error("❌ 다운로드에 실패했습니다.", { autoClose: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DownloadButton onClick={handleDownload} disabled={isLoading}>
      {isLoading ? "📄 다운로드 중..." : "📥 다운로드"}
    </DownloadButton>
  );
};
