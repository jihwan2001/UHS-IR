import { useState } from "react";
import {
  DropdownContainer,
  DropdownButton,
  DropdownList,
  DropdownItem,
} from "../styles";
import downArrow from "../../img/downArrow.png";

const sortOptions = ["최신 순", "오래된 순", "고정된 것만"];

interface SortDropdownProps {
  onSortChange: (sort: string) => void;
}

export const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]); // 기본값 "최신 순"

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedSort} <img src={downArrow} />
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
