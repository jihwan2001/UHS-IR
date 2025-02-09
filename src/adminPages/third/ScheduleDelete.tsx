import React from "react";
import axios from "axios";
import Scss from "./Scss";

interface ScheduleDeleteProps {
  modalData: { id: string }; // 삭제할 이벤트 데이터
  setEvents: React.Dispatch<React.SetStateAction<any[]>>; // 이벤트 리스트 상태 업데이트
  setDeleteClicked: (value: boolean) => void; // 삭제 팝업 상태 관리
  setCreateModalOpen: (value: boolean) => void; // 모달 지우기
  setModalOpen: (value: boolean) => void; // ✅ 모달 닫기 추가
  handleDeleteClick: () => void; // 취소 버튼 클릭 핸들러
}

const ScheduleDelete: React.FC<ScheduleDeleteProps> = ({
  modalData,
  setEvents,
  setDeleteClicked,
  handleDeleteClick,
  setCreateModalOpen,
  setModalOpen, // ✅ 추가된 prop
}) => {
  // 삭제 요청 함수
  const handleDelete = async () => {
    try {
      // 서버로 DELETE 요청
      await axios.delete(
        `http://localhost:3000/api/schedul/delete/${modalData.id}`
      );

      // 성공적으로 삭제 후 클라이언트 상태 업데이트
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== modalData.id)
      );

      // ✅ 모달 닫기
      setDeleteClicked(false);
      setCreateModalOpen(false);
      setModalOpen(false); // ✅ 추가: 삭제 후 모달 닫기

      alert("일정이 삭제되었습니다.");
    } catch (error) {
      console.error("❌ 일정 삭제 중 오류 발생:", error);
      alert("일정 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Scss.DeletePopUp>
      <div>해당 일정을 삭제하겠습니까?</div>
      <Scss.ButtonGroup>
        <Scss.Button type="button" onClick={handleDeleteClick}>
          취소
        </Scss.Button>
        <Scss.Button type="button" onClick={handleDelete}>
          삭제
        </Scss.Button>
      </Scss.ButtonGroup>
    </Scss.DeletePopUp>
  );
};

export default ScheduleDelete;
