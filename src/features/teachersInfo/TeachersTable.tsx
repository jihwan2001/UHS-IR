import { StyledTable, TableContainer } from "../notices/styles";
import { TeachersInfoItem } from "./model";
import { TeachersHeader } from "./TeachersHeader";
import { TeachersRow } from "./TeachersRow";

interface StudentTableProps {
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  teachers: TeachersInfoItem[];
}

export const TeachersTable = ({
  selectedIds,
  setSelectedIds,
  teachers,
}: StudentTableProps) => {
  return (
    <TableContainer>
      <StyledTable>
        <TeachersHeader />
        <tbody>
          {teachers.map((teacher) => (
            <TeachersRow
              key={teacher.userId}
              teacher={teacher}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
