import backIcon from "../../img/back.png";
import updateIcon from "../../img/upgrade.png";
import downloadIcon from "../../img/download.png";
import historyIcon from "../../img/history.png";
import deleteIcon from "../../img/cancel.png";
import RMcss from "./RMcss";

interface ReportPdfHeaderProps {
  handleBack: () => void;
  handleUpdate: () => void;
  handleDownload: () => void;
  handleHistory: () => void;
  handleDelete: () => void;
}

const ReportPdfHeader: React.FC<ReportPdfHeaderProps> = ({
  handleBack,
  handleUpdate,
  handleDownload,
  handleHistory,
  handleDelete,
}) => {
  return (
    <RMcss.PdfButtonContainer>
      <RMcss.PdfActionButton
        onClick={handleBack}
        color="#007bff"
        hoverColor="#0056b3"
      >
        <img src={backIcon} alt="뒤로가기" />
        뒤로가기
      </RMcss.PdfActionButton>
      <RMcss.PdfActionButtons>
        <RMcss.PdfActionButton
          onClick={handleUpdate}
          color="#498FFF"
          hoverColor="#4382e8"
        >
          <img src={updateIcon} alt="업데이트" />
          update
        </RMcss.PdfActionButton>
        <RMcss.PdfActionButton
          onClick={handleDownload}
          color="#FF7349"
          hoverColor="#de572e"
        >
          <img src={downloadIcon} alt="다운로드" />
          download
        </RMcss.PdfActionButton>
        <RMcss.PdfActionButton
          onClick={handleHistory}
          color="#ACACAC"
          hoverColor="#8f8f8f"
        >
          <img src={historyIcon} alt="히스토리" />
          history
        </RMcss.PdfActionButton>
        <RMcss.PdfActionButton
          onClick={handleDelete}
          color="#dc3545"
          hoverColor="#c82333"
        >
          <img src={deleteIcon} alt="삭제" />
          delete
        </RMcss.PdfActionButton>
      </RMcss.PdfActionButtons>
    </RMcss.PdfButtonContainer>
  );
};

export default ReportPdfHeader;
