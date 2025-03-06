import { useState } from "react";
import search from "../../img/find.png";
import { SearchContainer, SearchIcon, StyledInput } from "./styles";

export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SearchContainer isFocused={isFocused}>
      <SearchIcon src={search} alt="search-icon" />
      <StyledInput
        type="text"
        placeholder="검색어를 입력해주세요."
        onFocus={() => setIsFocused(true)} // ✅ 포커스 시 상태 변경
        onBlur={() => setIsFocused(false)} // ✅ 포커스 해제 시 원래대로
      />
    </SearchContainer>
  );
};
