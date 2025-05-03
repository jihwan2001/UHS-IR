import styled from "styled-components";
import { UploadArea } from "../../features/notices/styles";

export const Container = styled(UploadArea)<{ $dragOver: boolean }>`
  height: 50vh;
  font-size: 1.5rem;
  display: flex;
  /* flex-direction: column; ✅ 수직 정렬 */
  justify-content: center;
  align-items: center;
  gap: 16px; /* ✅ 요소 간 간격 */
  padding: 20px; /* ✅ 여백 */
  background-color: ${(props) => (props.$dragOver ? "#f0f8ff" : "#fff")};
  border: 2px dashed ${(props) => (props.$dragOver ? "#007bff" : "#ccc")};
  transition: all 0.3s ease;
  margin-bottom: 15px;
  overflow-y: auto; /* ✅ 파일 리스트 많아질 때 대비 */
`;

export const UploadLabel = styled.label<{ $dragOver: boolean }>`
  color: ${(props) => (props.$dragOver ? "#007bff" : "blue")};
  cursor: pointer;
  text-decoration: underline;
  font-weight: ${(props) => (props.$dragOver ? "bold" : "normal")};
  transition: color 0.3s ease, font-weight 0.3s ease;
  font-size: 1.2rem;
`;

export const GroupNameInput = styled.input`
  margin-top: 20px;
  margin-right: 10px;
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #0f2280;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;
