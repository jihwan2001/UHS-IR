import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { ComplainItem } from "../../features/inquiry/model";

import { FormBackBtn, FormContents, FormTitle } from "../../shared";
import {
  FormContainer,
  Label,
  BtnGroup,
  SubmitButton,
} from "../notices/styles";

import axios from "axios";

export const InquiryClearForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state as ComplainItem;

  // ✅ 상태값 관리
  const [title, setTitle] = useState(item.complainTitle);
  const [description, setDescription] = useState(item.complainDescription);
  const [action, setAction] = useState(item.complainAction || "");

  // ✅ 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/complain/${item.complainId}/edit`, action);
      alert("답변이 수정되었습니다.");
      navigate("/inquiries");
    } catch (err) {
      alert("수정 실패");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Label>제목</Label>
        <FormTitle
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />

        <Label>내용</Label>
        <FormContents
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="내용을 입력해주세요"
        />

        <Label>답변 보내기</Label>
        <FormContents
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder={"문의자에게 보낼 답변을 입력해주세요."}
        />
      </FormContainer>

      <BtnGroup>
        <FormBackBtn>
          목록
        </FormBackBtn>
        <SubmitButton type="submit">답변 수정</SubmitButton>
      </BtnGroup>
    </form>
  );
};
