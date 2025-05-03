import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const Contents = styled.div`
  width: 100vw;
  height: 100vh;
  margin-left: 40px;
  background-color: grey;
`;
export const DownloadButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  background-color: ${({ disabled }) => (disabled ? "#999" : "#0f2280")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  margin-bottom: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  transition: background-color 0.2s ease;
`;
