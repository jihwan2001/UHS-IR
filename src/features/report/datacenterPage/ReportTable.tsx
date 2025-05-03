// ReportTable.tsx
import { StyledTable, TableContainer } from "../../notices/styles";
import { ReportHeader } from "./ReportHeader";
import { ReportRow } from "./ReportRow";
import { ReportItems } from "../types";

interface ReportTableProps {
  reports: ReportItems[];
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ReportTable = ({
  reports,
  selectedIds,
  setSelectedIds,
}: ReportTableProps) => {
  return (
    <TableContainer>
      <StyledTable>
        <ReportHeader />
        <tbody>
          {reports.map((report) => (
            <ReportRow
              key={report.reportId}
              report={report}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
