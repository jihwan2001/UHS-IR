import search from "../../img/find.png";
import { SearchContainer, SearchIcon, StyledInput } from "./styles";

export const SearchBar = () => {
  return (
    <SearchContainer>
      <SearchIcon src={search} alt="search-icon" />
      <StyledInput type="text" placeholder="검색어를 입력해주세요." />
    </SearchContainer>
  );
};
