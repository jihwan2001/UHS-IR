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
import { useRecoilValue } from "recoil";
import { authState } from "../../authAtom";

export const InquiryUnClearForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state as ComplainItem;
  const { username } = useRecoilValue(authState); // ✅ 로그인 상태 가져오기

  // 상태
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/complain/${item.complainId}/reply`, {
        reply: answer,
        handlerName: username,
      });

      alert("처리되었습니다.");
      navigate("/datacenter/8");
    } catch (err) {
      alert("답변 등록 실패");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Label>제목</Label>
        <FormTitle
          value={item.complainTitle}
          placeholder="제목을 입력해주세요"
        />

        <Label>내용</Label>
        <FormContents
          value={item.complainDescription}
          placeholder="내용용을 입력해주세요"
        />

        <Label>답변 보내기</Label>
        <FormContents
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={"문의자에게 보낼 답변을 입력해주세요."}
        />
      </FormContainer>

      <BtnGroup>
        <FormBackBtn>목록</FormBackBtn>
        <SubmitButton type="submit">처리</SubmitButton>
      </BtnGroup>
    </form>
  );
};
