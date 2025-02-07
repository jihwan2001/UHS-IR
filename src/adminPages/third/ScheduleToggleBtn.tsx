import React from "react";
import pencil from "../../img/pencil.png";
import trashCan from "../../img/trashCan.png";
import cancel from "../../img/cancel.png";
import Scss from "./Scss";

interface ScheduleToggleBtnProps {
  modalData: { id: string }; // 선택된 이벤트 데이터
  modifyModal: (id: string) => void; // 수정 버튼 클릭 핸들러
  setDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>; // 삭제 클릭 상태 업데이트
  setModalOpen: (isOpen: boolean) => void; // 모달 열림/닫힘 상태 업데이트
}

const ScheduleToggleBtn: React.FC<ScheduleToggleBtnProps> = ({
  modalData,
  modifyModal,
  setDeleteClicked,
  setModalOpen,
}) => {
  return (
    <Scss.ToggleBtn>
      <div>
        <img
          src={pencil}
          alt="Edit"
          title="수정"
          onClick={() => modifyModal(modalData.id)}
        />
        <img
          src={trashCan}
          alt="Delete"
          title="삭제"
          onClick={() => setDeleteClicked((prev) => !prev)}
        />
      </div>
      <img
        src={cancel}
        alt="Cancel"
        title="취소"
        onClick={() => setModalOpen(false)}
      />
    </Scss.ToggleBtn>
  );
};

export default ScheduleToggleBtn;
