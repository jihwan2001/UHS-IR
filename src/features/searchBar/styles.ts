import styled from "styled-components";

export const SearchContainer = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  border: 2px solid ${({ isFocused }) => (isFocused ? "#0f2280" : "#ccc")}; /* ✅ 포커스 시 색상 변경 */
  border-right: none;
  border-radius: 4px 0 0 4px;
  max-width: 1000px;
  height: 60px;
  transition: border-color 0.3s ease-in-out;
`;

export const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  height: 100%;
  font-size: 1rem;
`;

export const SearchButton = styled.div`
  display: flex;
  align-items: center;
  background-color: #0f2280;
  color: white;
  border: none;
  height: 60px;
  padding: 5px 10px;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  &:hover {
    background-color: rgb(11, 25, 94);
  }
`;
