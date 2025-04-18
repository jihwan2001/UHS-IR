import { StyledTd } from "../notices/styles";
import { TeachersInfoItem } from "./model";

interface TeachersRowProps {
  teacher: TeachersInfoItem;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const TeachersRow = ({
  teacher,
  selectedIds,
  setSelectedIds,
}: TeachersRowProps) => {
  const isChecked = selectedIds.includes(teacher.userId);

  const handleCheckboxChange = () => {
    setSelectedIds((prev) =>
      isChecked
        ? prev.filter((id) => id !== teacher.userId)
        : [...prev, teacher.userId]
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
      <StyledTd noPointer>{teacher.userId}</StyledTd>
      <StyledTd noPointer>{teacher.userName}</StyledTd>
      <StyledTd noPointer>{teacher.userAccount}</StyledTd>
      <StyledTd>{teacher.userLevel ?? "-"}</StyledTd>
      <StyledTd>{teacher.userPosition ?? "-"}</StyledTd>
      <StyledTd>{teacher.userDept}</StyledTd>
      <StyledTd>{teacher.userDepart}</StyledTd>
      <StyledTd>{teacher.userBirth}</StyledTd>
      <StyledTd>{teacher.userPhone}</StyledTd>
      <StyledTd>{teacher.userAddress}</StyledTd>
    </tr>
  );
};
