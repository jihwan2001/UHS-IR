import React, { useEffect, useState } from "react";
import find from "../../img/find.png";
import { EventType } from "./types";
import Scss from "./Scss";
import { getSearch } from "../../api/notice"; // ✅ 공지사항 검색 API 임포트
import { debounce } from "lodash";

type ScheduleAddProps = {
  show: boolean;
  event: EventType | null;
  onSave: (newEvent: EventType) => void;
  onCancel: () => void;
};

const ScheduleAdd: React.FC<ScheduleAddProps> = ({
  show,
  event,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const [searchedNotices, setSearchedNotices] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(event.start);
      const adjustedEnd = new Date(event.end);
      adjustedEnd.setDate(adjustedEnd.getDate() - 1);
      setEnd(adjustedEnd.toISOString().split("T")[0]);
      setDescription(event.description);
    } else {
      setTitle("");
      setStart("");
      setEnd("");
      setDescription("");
    }
  }, [event]);

  useEffect(() => {
    const fetchData = debounce(async () => {
      if (description.trim()) {
        const data = await getSearch(description);
        console.log("🔎 검색 결과:", data);
        setSearchedNotices(data);
        setShowDropdown(true);
      } else {
        setSearchedNotices([]);
        setShowDropdown(false);
      }
    }, 300); // 0.3초 후 실행

    fetchData();

    return () => fetchData.cancel();
  }, [description]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !start || !end) {
      alert("모든 필드를 입력해주세요!");
      return;
    }
    onSave({ id: event?.id, title, start, end, description });
    onCancel();
  };

  const handleNoticeSelect = (selectedTitle: string) => {
    setDescription(selectedTitle);
    setShowDropdown(false);
  };

  return (
    <Scss.SModal
      show={show}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <input
            type="text"
            placeholder="제목 추가"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>시작일</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>종료일</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
        <div className="form-group with-icon" style={{ position: "relative" }}>
          <label>연결 공지사항</label>
          <img src={find} alt="find" />
          <input
            type="text"
            placeholder="찾으시는 공지사항 제목을 입력해주세요."
            value={description ? description : ""}
            onChange={(e) => setDescription(e.target.value)}
          />
          {showDropdown && searchedNotices.length > 0 && (
            <Scss.NoticeDropdown>
              {searchedNotices.map((notice) => (
                <Scss.NoticeItem
                  key={notice.boardId}
                  onClick={() => handleNoticeSelect(notice.boardTitle)}
                >
                  {notice.boardTitle}
                </Scss.NoticeItem>
              ))}
            </Scss.NoticeDropdown>
          )}
        </div>
        <div className="btn-group">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            취소
          </button>
          <button
            type="submit"
            className="save-btn"
            disabled={!title || !start || !end}
          >
            저장
          </button>
        </div>
      </form>
    </Scss.SModal>
  );
};

export default ScheduleAdd;
