import React from "react";
import back from "../../img/back.png";
import RMcss from "./RMcss";

interface BackButtonProps {
  parentDirId: number; // 현재 디렉토리 ID (null 가능)
  setParentDirId: React.Dispatch<React.SetStateAction<number>>; // 디렉토리 상태 변경 함수
}

const RMBackBtn: React.FC<BackButtonProps> = ({
  parentDirId,
  setParentDirId,
}) => {
  const handleBackClick = () => {
    // parentDirId가 null 또는 0이면 0으로 유지, 그렇지 않으면 1단계 위로 이동
    setParentDirId((prev) => (prev === null || prev <= 0 ? 0 : prev - 1));
  };

  return (
    <RMcss.BackButton onClick={handleBackClick}>
      <img src={back} alt="Back" /> 뒤로가기
    </RMcss.BackButton>
  );
};

export default RMBackBtn;
