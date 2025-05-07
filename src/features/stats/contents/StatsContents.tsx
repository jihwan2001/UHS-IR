import { useEffect, useState } from "react";
import { PdfItem } from "../types";
import { PdfDownloadButton } from "./PdfDownloadButton";
import { StatsContentsWrapper } from "../../../pages/styles";

interface Props {
  selectedItem: PdfItem | null;
  selectedYear: number;
}

export const StatsContents = ({ selectedItem, selectedYear }: Props) => {
  const [pdfExists, setPdfExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!selectedItem) return;

    const filename = `${selectedItem.baseName}_${selectedYear}.pdf`;
    const url = `http://localhost:8080/api/publicfile/preview/pdf/${encodeURIComponent(
      selectedItem.groupName
    )}/${encodeURIComponent(filename)}`;

    fetch(url, { method: "HEAD" })
      .then((res) => setPdfExists(res.ok))
      .catch(() => setPdfExists(false));
  }, [selectedItem, selectedYear]);

  return (
    <StatsContentsWrapper>
      {!selectedItem ? (
        <p style={{ color: "black" }}>왼쪽에서 항목을 선택하세요.</p>
      ) : pdfExists === null ? (
        <p style={{ color: "#fff" }}>📄 파일 확인 중...</p>
      ) : pdfExists === false ? (
        <p style={{ color: "red" }}>
          ❌ {selectedYear}년의 PDF가 존재하지 않습니다.
        </p>
      ) : (
        <>
          <div>
            <PdfDownloadButton
              baseName={selectedItem.baseName}
              groupName={selectedItem.groupName}
              year={selectedYear}
            />
          </div>
          <iframe
            src={`http://localhost:8080/api/publicfile/preview/pdf/${encodeURIComponent(
              selectedItem.groupName
            )}/${encodeURIComponent(
              `${selectedItem.baseName}_${selectedYear}.pdf`
            )}`}
            width="100%"
            height="100%"
            title="PDF Viewer"
            style={{ border: "none", flex: 1 }}
          />
        </>
      )}
    </StatsContentsWrapper>
  );
};
