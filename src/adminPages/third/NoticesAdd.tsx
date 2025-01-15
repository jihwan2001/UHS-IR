import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  padding: 20px;
  background-color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  outline: none;
  height: 100px;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const CheckboxContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  margin-left: 10px;
`;

const ScheduleContainer = styled.div`
  margin-bottom: 20px;
`;

const ScheduleDate = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
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
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:last-child {
    background-color: #6c757d;
    &:hover {
      background-color: #5a6268;
    }
  }
`;

const SmallInput = styled(Input)`
  width: 100px;
  padding: 5px;
  font-size: 12px;
`;
interface NoticesAddProps {
  setAddBtnClicked: (value: boolean) => void;
}

const NoticesAdd = ({ setAddBtnClicked }: NoticesAddProps) => {
  const [checked, setChecked] = useState(false); // 체크박스 선택시
  const [formData, setFormData] = useState({
    board_title: "",
    board_description: "",
    schedul_event_date: "",
    schedul_title: "",
    user_id: 1,
  });
  const handleCancel = () => {
    setAddBtnClicked(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/board/add",
        formData
      );
      console.log("요청 성공", response);
      alert("공지가 성공적으로 등록되었습니다.");
      setAddBtnClicked(false);
    } catch (error) {
      console.log("요청 실패", error);
      alert("공지를 등록하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {/* 제목 및 내용 */}
        <FormGroup>
          <Label htmlFor="board_title">제목</Label>
          <Input
            type="text"
            id="board_title"
            value={formData.board_title}
            onChange={handleChange}
            placeholder="제목을 입력해 주세요"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="board_description">내용</Label>
          <TextArea
            id="board_description"
            value={formData.board_description}
            onChange={handleChange}
            placeholder="내용을 입력해 주세요"
            required
          />
        </FormGroup>

        {/* 학사 일정 추가 */}
        <CheckboxContainer>
          <input
            type="checkbox"
            id="schedule"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <CheckboxLabel htmlFor="schedule">
            학사일정 함께 추가하기
          </CheckboxLabel>
        </CheckboxContainer>

        {checked && (
          <>
            <ScheduleContainer>
              <ScheduleDate>
                <Label htmlFor="schedul_event_date">날짜:</Label>
                <SmallInput
                  type="date"
                  id="schedul_event_date"
                  value={formData.schedul_event_date}
                  onChange={handleChange}
                />
              </ScheduleDate>
              <FormGroup>
                <Label htmlFor="schedul_title">일정 제목</Label>
                <Input
                  type="text"
                  id="schedul_title"
                  value={formData.schedul_title}
                  onChange={handleChange}
                  placeholder="일정 제목을 입력해 주세요"
                />
              </FormGroup>
            </ScheduleContainer>
          </>
        )}

        {/* 버튼 그룹 */}
        <ButtonGroup>
          <Button type="submit">작성</Button>
          <Button type="button" onClick={handleCancel}>
            취소
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
};

export default NoticesAdd;
