import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // 타입 import
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import pencil from "../../img/pencil.png";
import trashCan from "../../img/trashCan.png";
import cancel from "../../img/cancel.png";
import { EventClickArg } from "@fullcalendar/core";
import ScheduleAdd from "./ScheduleAdd";

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

const Schedule = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "학사 일정 확인",
      start: "2025-01-05",
      end: "2025-01-12",
      description: "여기 들어가는 이름은 음 대략 띄어쓰기 포함 25",
    },
    {
      id: "2",
      title: "팀 회의",
      start: "2025-01-07",
      end: "2025-01-11",
      description: "회의 주제는 프로젝트 상태 점검입니다.",
    },
  ]);
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

  // 이벤트 클릭 핸들러
  const handleEventClick = (info: EventClickArg) => {
    const { id, title, start, end, extendedProps } = info.event;

    const startDate = new Date(start!).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const endDate = end
      ? new Date(end).toLocaleDateString("ko-KR", {
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
  const handleSaveEvent = (newEvent: {
    id?: string;
    title: string;
    start: string;
    end: string;
    description: string;
  }) => {
    if (newEvent.id) {
      // 기존 이벤트 수정
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === newEvent.id ? { ...event, ...newEvent } : event
        )
      );
    } else {
      // 새 이벤트 추가
      setEvents((prevEvents) => [
        ...prevEvents,
        { ...newEvent, id: (prevEvents.length + 1).toString() },
      ]);
    }

    setCreateModalOpen(false);
    setSelectedEvent(null);
  };

  // 이벤트 삭제 핸들러
  const deleteModal = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    setModalOpen(false);
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
                  onClick={() => modifyModal(modalData.id)}
                />
                <img
                  src={trashCan}
                  alt="Delete"
                  onClick={() => deleteModal(modalData.id)}
                />
              </div>
              <img
                src={cancel}
                alt="Cancel"
                onClick={() => setModalOpen(false)}
              />
            </ToggleBtn>
            <div className="modal-header">{modalData.title}</div>
            <div className="modal-date">{modalData.date}</div>
            <div className="modal-description">{modalData.description}</div>
          </>
        )}
      </Modal>

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
