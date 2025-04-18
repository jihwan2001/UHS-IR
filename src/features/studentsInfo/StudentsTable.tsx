import { StyledTable, TableContainer } from "../notices/styles";
import { StudentInfoItem } from "./model";
import { StudentsHeader } from "./StudentsHeader";
import { StudentsRow } from "./StudentsRow";

interface StudentTableProps {
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  students: StudentInfoItem[];
}

export const StudentsTable = ({
  selectedIds,
  setSelectedIds,
  students,
}: StudentTableProps) => {
  return (
    <TableContainer>
      <StyledTable>
        <StudentsHeader />
        <tbody>
          {students.map((student) => (
            <StudentsRow
              key={student.userId}
              student={student}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
