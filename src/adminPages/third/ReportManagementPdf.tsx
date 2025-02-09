import { useLocation, useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import RMcss from "./RMcss";
import ReportPdfHeader from "./ReportPdfHeader";
import axios from "axios";
import { useState, useEffect } from "react";

interface File {
  file_name: string;
  file_date: string;
  fileId?: number; // 파일 ID 추가
}

const ReportManagementPdf: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const file: File | undefined = location.state?.file; // 🔹 파일이 없을 경우 대비
  const parentDirId: number = location.state?.parentDirId || 0; // 기본값 설정
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // ✅ useEffect를 항상 실행되도록 수정
  useEffect(() => {
    if (!file || !file.fileId) {
      setPdfUrl(null);
      return;
    }

    const fetchPdfBlob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/files/${file.fileId}/download`,
          { responseType: "blob" }
        );

        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
        setPdfUrl(blobUrl);
      } catch (error) {
        console.error("PDF 다운로드 중 오류 발생:", error);
        setPdfUrl(null);
      }
    };

    fetchPdfBlob();
  }, [file?.fileId]); // ✅ `file`이 변경될 때만 실행

  // ✅ 파일이 없으면 useEffect 후 return (조건문을 useEffect 아래로 이동)
  if (!file) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        📂 파일이 없습니다.
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleUpdate = async () => {
    if (!file || !file.fileId) {
      alert("파일 정보가 없습니다.");
      return;
    }

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".hwp";

    fileInput.onchange = async (event) => {
      const inputElement = event.target as HTMLInputElement;
      if (!inputElement.files || inputElement.files.length === 0) return;

      const selectedFile = inputElement.files[0];
      const formData = new FormData();
      formData.append("files", selectedFile);
      formData.append("userId", "1");
      formData.append("dir_id", parentDirId.toString());

      try {
        await axios.post(
          `http://localhost:8080/api/reupload/file/${file.fileId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("파일이 성공적으로 재업로드되었습니다.");
      } catch (error) {
        console.error("파일 업로드 중 오류 발생:", error);
        alert("파일 업로드 중 오류가 발생했습니다.");
      }
    };

    fileInput.click();
  };

  const handleDownload = async () => {
    if (!file || !file.fileId) {
      alert("파일 정보가 없습니다.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/files/${file.fileId}/download`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.file_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      alert("파일 다운로드가 완료되었습니다.");
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
      alert("파일 다운로드 중 오류가 발생했습니다.");
    }
  };

  const handleHistory = () => {
    navigate("/adminPage/ReportPdfHistory", { state: { parentDirId } });
  };

  const handleDelete = async () => {
    if (!file || !file.fileId) {
      alert("파일 정보가 없습니다.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/files/${file.fileId}?userId=1`
      );
      alert("파일이 성공적으로 삭제되었습니다.");
      navigate(-1); // 삭제 후 이전 페이지로 이동
    } catch (error) {
      console.error("파일 삭제 중 오류 발생:", error);
      alert("파일 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <RMcss.FileTitle>{file.file_name}</RMcss.FileTitle>
      <RMcss.FileContainer>
        <RMcss.FileDetails>
          <RMcss.DetailItem>
            <RMcss.Icon>📅</RMcss.Icon> {file.file_date}
          </RMcss.DetailItem>
          <RMcss.DetailItem>
            <RMcss.Icon>👤</RMcss.Icon> 사용자명
          </RMcss.DetailItem>
        </RMcss.FileDetails>
      </RMcss.FileContainer>

      <ReportPdfHeader
        handleBack={handleBack}
        handleUpdate={handleUpdate}
        handleDownload={handleDownload}
        handleHistory={handleHistory}
        handleDelete={handleDelete}
      />

      {/* PDF 뷰어 */}
      <div
        style={{ height: "600px", border: "1px solid #ddd", marginTop: "10px" }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {pdfUrl ? (
            <Viewer fileUrl={pdfUrl} />
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              📂 PDF 파일을 불러오는 중...
            </div>
          )}
        </Worker>
      </div>
    </div>
  );
};

export default ReportManagementPdf;
