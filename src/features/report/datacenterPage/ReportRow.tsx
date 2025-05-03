import { StyledTd } from "../../notices/styles";
import { ReportItems } from "../types";

interface ReportRowProps {
  report: ReportItems;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ReportRow = ({
  report,
  selectedIds,
  setSelectedIds,
}: ReportRowProps) => {
  const isChecked = selectedIds.includes(report.reportId);

  const handleCheckboxChange = () => {
    setSelectedIds((prev) =>
      isChecked
        ? prev.filter((id) => id !== report.reportId)
        : [...prev, report.reportId]
    );
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <tr>
      <StyledTd noPointer>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </StyledTd>
      <StyledTd noPointer>{report.reportId}</StyledTd>
      <StyledTd noPointer>{report.reportName}</StyledTd>
      <StyledTd>{report.reportYear}</StyledTd>
      <StyledTd>{report.reportMonth}</StyledTd>
      <StyledTd>{formatDate(report.reportDate)}</StyledTd>
    </tr>
  );
};
