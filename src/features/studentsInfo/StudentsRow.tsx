import { StyledTd } from "../notices/styles";
import { StudentInfoItem } from "./model";

interface StudentRowProps {
  student: StudentInfoItem;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const StudentsRow = ({
  student,
  selectedIds,
  setSelectedIds,
}: StudentRowProps) => {
  const isChecked = selectedIds.includes(student.userId);

  const handleCheckboxChange = () => {
    setSelectedIds((prev) =>
      isChecked
        ? prev.filter((id) => id !== student.userId)
        : [...prev, student.userId]
    );
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
      <StyledTd noPointer>{student.userId}</StyledTd>
      <StyledTd noPointer>{student.userName}</StyledTd>
      <StyledTd noPointer>{student.userAccount}</StyledTd>
      <StyledTd>{student.userLevel ?? "-"}</StyledTd>
      <StyledTd>{student.userPosition ?? "-"}</StyledTd>
      <StyledTd>{student.userDept}</StyledTd>
      <StyledTd>{student.userDepart}</StyledTd>
      <StyledTd>{student.userBirth}</StyledTd>
      <StyledTd>{student.userPhone}</StyledTd>
      <StyledTd>{student.userAddress}</StyledTd>
    </tr>
  );
};
