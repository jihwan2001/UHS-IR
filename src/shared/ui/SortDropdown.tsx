import { useState } from "react";
import {
  DropdownContainer,
  DropdownButton,
  DropdownList,
  DropdownItem,
} from "../styles";
import downArrow from "../../img/downArrow.png";

interface SortDropdownProps {
  sortOptions: string[]; // ✅ 옵션을 외부에서 전달
  onSortChange: (sortIndex: number) => void;
}

export const SortDropdown = ({
  sortOptions,
  onSortChange,
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]); // 기본값 첫 번째 옵션

  const handleSortChange = (sort: string) => {
    const sortIndex = sortOptions.indexOf(sort); // 문자열을 인덱스로 변환
    setSelectedSort(sort);
    onSortChange(sortIndex); // ✅ 숫자로 변환하여 전달
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedSort} <img src={downArrow} alt="down arrow" />
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {sortOptions.map((option) => (
            <DropdownItem key={option} onClick={() => handleSortChange(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};
