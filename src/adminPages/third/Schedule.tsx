import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // 타입 import
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import pencil from "../../img/pencil.png";
import trashCan from "../../img/trashCan.png";
import cancel from "../../img/cancel.png";
import { EventClickArg } from "@fullcalendar/core";
import ScheduleAdd from "./ScheduleAdd";
import axios from "axios";
import { EventType } from "./types";

const CalendarContainer = styled.div`
  .fc .fc-day-sun a {
    color: red;
  }
  .fc .fc-day-sat a {
    color: blue;
  }
  .fc-myButton-button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #1bd130;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #10741c;
    }
  }
  .fc-event {
    font-size: 0.9rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .fc-h-event {
    padding: 3px;
    margin-bottom: 10px;
  }
`;

const Modal = styled.div<{ show: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  z-index: 1000;
  display: ${(props) => (props.show ? "block" : "none")};

  .modal-header {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .modal-date {
    color: gray;
    margin-bottom: 10px;
  }
`;

const ToggleBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  img {
    cursor: pointer;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #6c757d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #5a6268;
  }
  &:last-child {
    background-color: #ff8a8a;
    &:hover {
      background-color: #c46a6a;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const DeletePopUp = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 10px;
  width: 450px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 100;
  background-color: #fff;
`;

const Schedule = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [modalData, setModalData] = useState<null | {
    id: string;
    title: string;
    date: string;
    description: string;
  }>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<null | (typeof events)[0]>(
    null
  );
  const [deleteClick, setDeleteClicked] = useState(false); // 삭제버튼

  // 서버로부터 이벤트 데이터를 가져오는 함수
  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://localhost:3000/api/schedul/list"
      );

      const formattedEvents = response.data.map((item: any) => ({
        id: item.schedul_id.toString(),
        title: item.schedul_title,
        start: `${item.schedul_year}-${String(item.schedul_month).padStart(
          2,
          "0"
        )}-${String(item.schedul_day).padStart(2, "0")}`,
        end: `${item.schedul_year}-${String(item.schedul_month).padStart(
          2,
          "0"
        )}-${String(item.schedul_day).padStart(2, "0")}`,
        description: item.board_id
          ? `공지사항 ID: ${item.board_id}`
          : "설명이 없습니다.",
      }));

      setEvents(formattedEvents); // 상태 업데이트
    } catch (error) {
      console.error("이벤트 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchEvents();
  }, []);

  // 이벤트 클릭 핸들러
  const handleEventClick = (info: EventClickArg) => {
    const { id, title, start, end, extendedProps } = info.event;

    const startDate = new Date(start!).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const endDate = end
      ? new Date(new Date(end).getTime() - 24 * 60 * 60 * 1000) // 하루 빼기
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
      : null;

    setModalData({
      id,
      title,
      date: endDate ? `${startDate} ~ ${endDate}` : startDate,
      description: extendedProps.description,
    });

    setModalOpen(true);
  };

  // 이벤트 수정 핸들러
  const modifyModal = (id: string) => {
    const clickedEvent = events.find((event) => event.id === id);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setModalOpen(false);
      setCreateModalOpen(true);
    }
  };

  // 저장 핸들러 (수정 및 새 일정 추가)
  const handleSaveEvent = async (newEvent: EventType) => {
    // 종료일을 하루 뒤로 조정 (FullCalendar용)
    const adjustedEnd = new Date(newEvent.end);
    adjustedEnd.setDate(adjustedEnd.getDate() + 1);

    const formattedEnd = adjustedEnd.toISOString().split("T")[0]; // yyyy-MM-dd 형식

    if (newEvent.id) {
      // 기존 이벤트 수정
      try {
        await axios.put(
          `https://localhost:3000/api/schedul/${newEvent.id}/update`,
          {
            schedulTitle: newEvent.title,
            schedulEventStartDate: newEvent.start,
            schedulEventEndDate: formattedEnd,
            boardId: newEvent.description, // 연결 공지사항 ID
            // schedulDate: newEvent.start, // 이건 머임?
          }
        );

        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === newEvent.id
              ? { ...event, ...newEvent, end: formattedEnd }
              : event
          )
        );
        alert("일정이 수정되었습니다.");
      } catch (error) {
        console.error("일정 수정 실패:", error);
        alert("일정 수정 중 오류가 발생했습니다.");
      }
    } else {
      // 새 이벤트 추가
      try {
        const response = await axios.post(
          "https://localhost:3000/api/schedul/create",
          {
            schedul_title: newEvent.title,
            schedul_start_date: newEvent.start,
            schedul_end_date: formattedEnd,
            schedul_date: newEvent.start, // 학사 일정 메인 날짜로 start 사용
            board_id: newEvent.description, // 연결 공지사항 ID
          }
        );

        const createdEvent = response.data;

        setEvents((prevEvents) => [
          ...prevEvents,
          {
            ...newEvent,
            id: createdEvent.id.toString(), // 서버에서 생성된 ID 사용
            end: formattedEnd,
          },
        ]);

        alert("새 일정이 추가되었습니다.");
      } catch (error) {
        console.error("새 일정 추가 실패:", error);
        alert("새 일정 추가 중 오류가 발생했습니다.");
      }
      try {
        const response = await axios.post(
          "https://localhost:3000/api/schedul/create",
          {
            schedul_title: newEvent.title,
            schedul_start_date: newEvent.start,
            schedul_end_date: formattedEnd,
            schedul_date: newEvent.start, // 학사 일정 메인 날짜로 start 사용
            board_id: newEvent.description, // 연결 공지사항 ID
          }
        );

        const createdEvent = response.data;

        setEvents((prevEvents) => [
          ...prevEvents,
          {
            ...newEvent,
            id: createdEvent.id.toString(), // 서버에서 생성된 ID 사용
            end: formattedEnd,
          },
        ]);

        alert("새 일정이 추가되었습니다.");
      } catch (error) {
        console.error("새 일정 추가 실패:", error);
        alert("새 일정 추가 중 오류가 발생했습니다.");
      }
    }

    // 모달 닫기
    setCreateModalOpen(false);
    setSelectedEvent(null);
  };

  // 이벤트 삭제 핸들러
  const deleteModal = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    setModalOpen(false);
  };
  // 삭제 버튼 클릭시
  const handleDeleteClick = () => {
    setDeleteClicked((prev) => !prev);
  };

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        timeZone="Asia/Seoul"
        headerToolbar={{
          left: "prev today",
          center: "title",
          right: "myButton next",
        }}
        customButtons={{
          myButton: {
            text: "+ 만들기",
            click: () => setCreateModalOpen(true),
          },
        }}
        weekends={true}
        events={events}
        dayCellContent={(info) => info.date.getDate()} // 날짜만 표시
        views={{
          dayGridMonth: {
            dayMaxEventRows: 3, // 하루에 최대 3개의 이벤트 표시
            buttonText: "월간", // 월간 뷰 버튼 텍스트
          },
        }}
        eventClick={handleEventClick}
      />

      {/* 기존 이벤트 모달 */}
      <Modal show={isModalOpen}>
        {modalData && (
          <>
            <ToggleBtn>
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
            </ToggleBtn>
            <div className="modal-header">{modalData.title}</div>
            <div className="modal-date">{modalData.date}</div>
            <div className="modal-description">{modalData.description}</div>
            {deleteClick && (
              <>
                <DeletePopUp>
                  <div>해당 일정을 삭제하겠습니까?</div>
                  <ButtonGroup>
                    <Button type="button" onClick={handleDeleteClick}>
                      취소
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        deleteModal(modalData.id);
                        setDeleteClicked(false);
                      }}
                    >
                      삭제
                    </Button>
                  </ButtonGroup>
                </DeletePopUp>
              </>
            )}
          </>
        )}
      </Modal>
      {deleteClick && <Overlay />}

      {/* 일정 추가/수정 모달 */}
      {isCreateModalOpen && (
        <ScheduleAdd
          show={isCreateModalOpen}
          event={selectedEvent} // 선택된 이벤트 데이터 전달
          onSave={handleSaveEvent}
          onCancel={() => {
            setCreateModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </CalendarContainer>
  );
};

export default Schedule;
