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

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 줄임표(...) 표시 */
  white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 강제 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const FullText = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  white-space: normal; /* 여러 줄로 표시 */
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
  const [showFullTitle, setShowFullTitle] = useState(false);

  const [formData, setFormData] = useState({
    boardTitle: "",
    boardDescription: "",
    schedulStartEventDate: "",
    schedulEndEventDate: "",
    schedulTitle: "",
    userId: 1,
  });

  const handleCancel = () => {
    setAddBtnClicked(false);
  };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { id, value } = e.target;
  //   // setFormData({ ...formData, [id]: value });
  //   setFormData({ ...formData, schedul_title: e.target.value });
  // };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/board/add",
        formData
      );
      console.log("요청 성공", response);
      alert("공지가 성공적으로 등록되었습니다.");
      window.location.reload();
      setAddBtnClicked(false);
    } catch (error) {
      console.log("요청 실패", error);
      console.log(formData)
      alert("공지를 등록하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {/* 제목 및 내용 */}
        <FormGroup>
          <Label htmlFor="boardTitle">제목</Label>
          <Input
            type="text"
            id="boardTitle"
            value={formData.boardTitle}
            onChange={handleChange}
            placeholder="제목을 입력해 주세요"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="boardDescription">내용</Label>
          <TextArea
            id="boardDescription"
            value={formData.boardDescription}
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
                <Label htmlFor="schedulStartEventDate">시작 날짜:</Label>
                <SmallInput
                  type="date"
                  id="schedulStartEventDate"
                  value={formData.schedulStartEventDate} // 시작 날짜 값
                  onChange={handleChange} // 하나의 이벤트 객체를 넘김
                />

                <Label htmlFor="schedulEndEventDate">종료 날짜:</Label>
                <SmallInput
                  type="date"
                  id="schedulEndEventDate"
                  value={formData.schedulEndEventDate} // 종료 날짜 값
                  onChange={handleChange} // 하나의 이벤트 객체를 넘김
                />
              </ScheduleDate>

              <FormGroup>
                <Label htmlFor="schedulTitle">일정 제목</Label>
                <InputContainer>
                  <Input
                    type="text"
                    id="schedulTitle"
                    value={formData.schedulTitle}
                    onChange={handleChange}
                    placeholder="일정 제목을 입력해 주세요"
                    onFocus={() =>
                      formData.schedulTitle.length > 18 &&
                      setShowFullTitle(true)
                    }
                    onBlur={() => setShowFullTitle(false)}
                  />
                  {showFullTitle && formData.schedulTitle.length > 18 && (
                    <FullText>{formData.schedulTitle}</FullText>
                  )}
                </InputContainer>
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