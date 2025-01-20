import React, { useEffect, useState } from "react";
import styled from "styled-components";
import find from "../../img/find.png";

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
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
  .modal-header input {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    font-size: 20px;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

  .form-group.with-icon {
    position: relative;

    input {
      padding-left: 40px;
    }

    img {
      position: absolute;
      top: 65%;
      left: 10px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
    }
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
      padding: 10px 20px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .save-btn {
      background-color: #ff6b6b;
      color: white;
      &:hover {
        background-color: #e45757;
      }
    }

    .cancel-btn {
      background-color: #ccc;
      &:hover {
        background-color: #bbb;
      }
    }
  }
`;

type ScheduleAddProps = {
  show: boolean;
  event: {
    id?: string;
    title: string;
    start: string;
    end: string;
    description: string;
  } | null; // event가 없을 수도 있으므로 null 허용
  onSave: (newEvent: {
    id?: string;
    title: string;
    start: string;
    end: string;
    description: string;
  }) => void;
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

  // event가 변경될 때 필드 초기화
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(event.start);
      setEnd(event.end);
      setDescription(event.description);
    } else {
      setTitle("");
      setStart("");
      setEnd("");
      setDescription("");
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !start || !end) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    onSave({
      id: event?.id, // 수정 중인 경우 기존 id를 전달
      title,
      start,
      end,
      description,
    });
  };

  return (
    <Modal show={show}>
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

        <div className="form-group with-icon">
          <label>연결 공지사항</label>
          <img src={find} alt="find" />
          <input
            type="text"
            placeholder="찾으시는 공지사항 제목을 입력해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="btn-group">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            취소
          </button>
          <button type="submit" className="save-btn">
            저장
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ScheduleAdd;
