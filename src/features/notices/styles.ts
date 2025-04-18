import styled from "styled-components";

export const AddBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0f2280;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  border: none;
  outline: none;
`;
export const TableContainer = styled.div`
  width: 70vw;
  max-width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.125rem;
  table-layout: fixed;
`;

export const StyledTh = styled.th`
  padding: 12px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  font-weight: bold;
  text-align: center;
`;

export const StyledTd = styled.td<{ noPointer?: boolean }>`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  word-wrap: break-word;
  cursor: ${(props) => (props.noPointer ? "default" : "pointer")};
`;

export const TitleTd = styled(StyledTd)`
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const StyledCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
`;

// form 관련

export const UploadArea = styled.div`
  width: 100%;
  padding: 20px;
  text-align: left; /* 좌측 정렬 */
  border: 2px dashed #ccc;
  border-radius: 5px;
  font-size: 14px;
  color: #777;
  cursor: pointer;

  &:hover {
    border-color: #0f2280;
  }
`;

export const FileList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 8px;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid #ddd;
`;

export const CancelIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 1.125rem;
  cursor: pointer;
  padding: 10px 15px;
  transition: color 0.3s ease-in-out, font-weight 0.3s ease-in-out;

  &.active {
    color: black;
    font-weight: bold;
  }

  &.inactive {
    color: #b8b8b8;
    font-weight: normal;
  }
`;

export const Contents = styled.span`
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.125rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Icon = styled.img`
  width: 1.125rem;
  height: 1.125rem;
`;
