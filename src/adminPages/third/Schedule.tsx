import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // 타입 import
import dayGridPlugin from "@fullcalendar/daygrid";

import { EventClickArg } from "@fullcalendar/core";
import ScheduleAdd from "./ScheduleAdd";
import axios from "axios";
import { EventType } from "./types";
import Scss from "./Scss";
import ScheduleToggleBtn from "./ScheduleToggleBtn";
import ScheduleDelete from "./ScheduleDelete";

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
        "http://localhost:3000/api/schedul/list"
      );

      const formattedEvents = response.data.map((item: any) => {
        const endDate = new Date(item.schedulEventEndDate);
        endDate.setDate(endDate.getDate() + 1); // ✅ 종료 날짜 하루 추가

        return {
          id: item.schedulId.toString(),
          title: item.schedulTitle,
          start: item.schedulEventStartDate,
          end: endDate.toISOString().split("T")[0], // yyyy-MM-dd 형식 변환
          description: item.boardId
            ? `공지사항 ID: ${item.description}`
            : "설명이 없습니다.",
        };
      });

      console.log("✅ 변환된 일정 데이터:", formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error("❌ 일정 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchEvents();
  }, []);

  // 이벤트 클릭 핸들러
  const handleEventClick = (info: EventClickArg) => {
    const { id, title, start, end, extendedProps } = info.event;

    // 시작 날짜 변환
    const startDate = new Date(start!).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // `end` 값이 있는 경우만 변환 (없으면 null)
    let endDate = null;
    if (end) {
      try {
        endDate = new Date(end);
        endDate.setDate(endDate.getDate() - 1); // 하루 빼기
        endDate = endDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch (error) {
        console.error("날짜 변환 오류:", error);
        endDate = null; // 유효하지 않은 날짜인 경우 null 처리
      }
    }

    setModalData({
      id,
      title,
      date: endDate ? `${startDate} ~ ${endDate}` : startDate,
      description: extendedProps.description || "설명이 없습니다.",
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

    // const formattedEnd = new Date(newEvent.end).toISOString().split("T")[0]; // yyyy-MM-dd 형식
    const formattedEnd = adjustedEnd.toISOString().split("T")[0];

    if (newEvent.id) {
      // 기존 이벤트 수정
      try {
        await axios.put(
          `http://localhost:3000/api/schedul/${newEvent.id}/update`,
          {
            schedulTitle: newEvent.title,
            schedulEventStartDate: newEvent.start,
            schedulEventEndDate: newEvent.end,
            boardId:
              typeof newEvent.description === "number"
                ? newEvent.description
                : null, // 연결 공지사항 ID
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
          "http://localhost:3000/api/schedul/create",
          {
            schedulTitle: newEvent.title,
            schedulEventStartDate: newEvent.start, // ✅ 올바른 필드 사용
            schedulEventEndDate: newEvent.end, //formattedEnd,      // ✅ 올바른 필드 사용
            boardId:
              typeof newEvent.description === "number"
                ? newEvent.description
                : null,
          }
        );
        const createdEvent = response.data;
        console.log("일정 : ", createdEvent); // 수정
        if (!createdEvent || !createdEvent.id) {
          throw new Error("서버에서 생성된 일정 ID가 없습니다.");
        }
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
        console.error("❌ 새 일정 추가 실패:", error);
        alert("새 일정 추가 중 오류가 발생했습니다.");
      }
    }

    // 모달 닫기
    setCreateModalOpen(false);
    setSelectedEvent(null);
  };

  // 삭제 버튼 클릭시
  const handleDeleteClick = () => {
    setDeleteClicked((prev) => !prev);
  };

  return (
    <Scss.CalendarContainer>
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
      <Scss.Modal show={isModalOpen}>
        {modalData && (
          <>
            {/* 수정 삭제 취소 버튼 */}
            <ScheduleToggleBtn
              modalData={modalData!} // 반드시 값이 존재한다고 가정
              modifyModal={modifyModal} // 수정 핸들러 함수
              setDeleteClicked={setDeleteClicked} // 삭제 클릭 상태 업데이트 함수
              setModalOpen={setModalOpen} // 모달 상태 업데이트 함수
            />
            <div className="modal-header">{modalData.title}</div>
            <div className="modal-date">{modalData.date}</div>
            <div className="modal-description">{modalData.description}</div>
            {deleteClick && (
              <ScheduleDelete
                modalData={modalData!}
                setEvents={setEvents}
                setDeleteClicked={setDeleteClicked}
                handleDeleteClick={handleDeleteClick}
                setCreateModalOpen={setCreateModalOpen}
              />
            )}
          </>
        )}
      </Scss.Modal>
      {deleteClick && <Scss.Overlay />}

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
    </Scss.CalendarContainer>
  );
};

export default Schedule;
