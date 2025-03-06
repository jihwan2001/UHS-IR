import styled from "styled-components";

export const SearchContainer = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  border: 2px solid ${({ isFocused }) => (isFocused ? "#0f2280" : "#ccc")}; /* ✅ 포커스 시 색상 변경 */
  border-radius: 4px;
  padding: 4px;
  max-width: 540px;
  height: 60px;
  transition: border-color 0.3s ease-in-out;
`;

export const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  height: 100%;
  font-size: 16px;
`;
