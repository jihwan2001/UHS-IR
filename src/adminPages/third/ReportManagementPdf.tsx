import { useLocation, useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import RMcss from "./RMcss";
import back from "../../img/back.png";

const ReportManagementPdf = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;

  if (!file) {
    return <div>파일이 없습니다.</div>;
  }

  const pdfUrl = URL.createObjectURL(file);

  return (
    <div style={{ padding: "20px" }}>
      <RMcss.ButtonContainer>
        <RMcss.BackButton onClick={() => navigate(-1)}>
          <img src={back} /> 뒤로가기
        </RMcss.BackButton>
      </RMcss.ButtonContainer>

      <div
        style={{ height: "600px", border: "1px solid #ddd", marginTop: "10px" }}
      >
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </div>
    </div>
  );
};

export default ReportManagementPdf;
