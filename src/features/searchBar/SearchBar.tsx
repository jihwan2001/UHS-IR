import { useState, useEffect } from "react";
import search from "../../img/find.png";
import {
  SearchContainer,
  SearchIcon,
  StyledInput,
  SearchButton,
} from "./styles";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedSearchTerm = sessionStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  // 🔹 검색 실행 함수
  const handleSearch = () => {
    if (onSearch) {
      console.log(`🔍 검색 실행: ${searchTerm.trim() || "검색어 없음"}`); // ✅ 검색어 없을 때도 실행
      if (searchTerm.trim() === "") {
        sessionStorage.removeItem("searchTerm"); // ✅ 검색어 없을 때 삭제
      } else {
        sessionStorage.setItem("searchTerm", searchTerm.trim());
      }
      onSearch(searchTerm.trim());
    }
  };

  // 🔹 Enter 키 입력 시 검색 실행
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <SearchContainer isFocused={isFocused}>
        <SearchIcon src={search} alt="search-icon" />
        <StyledInput
          type="text"
          placeholder="검색어 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} // ✅ Enter 키 이벤트 처리
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </SearchContainer>
      {/* 🔹 검색 버튼 추가 */}
      <SearchButton onClick={handleSearch}>검색</SearchButton>
    </>
  );
};
