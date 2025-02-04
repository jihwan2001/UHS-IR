import React, { useState } from "react";
import RMcss from "./RMcss";

interface FolderModalProps {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void; // 모달 닫기 함수
  onSubmit: (folderName: string) => void; // 폴더 이름 제출 함수
}

const FolderModal: React.FC<FolderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = () => {
    if (!folderName.trim()) {
      alert("폴더 이름을 입력하세요."); // 빈 문자열 유효성 검사
      return;
    }

    onSubmit(folderName.trim());
    setFolderName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <RMcss.ModalOverlay>
      <RMcss.Modal>
        <RMcss.ModalTitle>새 폴더 생성</RMcss.ModalTitle>
        <RMcss.Input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="폴더 이름을 입력하세요"
        />
        <RMcss.FolderButtonContainer>
          <RMcss.FolderButton color="#28a745" onClick={handleSubmit}>
            확인
          </RMcss.FolderButton>
          <RMcss.FolderButton color="#dc3545" onClick={onClose}>
            취소
          </RMcss.FolderButton>
        </RMcss.FolderButtonContainer>
      </RMcss.Modal>
    </RMcss.ModalOverlay>
  );
};

export default FolderModal;
