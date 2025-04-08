import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Input, TextArea, Title } from "./styles";

export const InquiryReception = () => {
  const [complainTitle, setComplainTitle] = useState("");
  const [complainDescription, setComplainDescription] = useState("");

  const postInquiry = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/complain/add",
        {
          complainTitle,
          complainDescription,
        },
        {
          withCredentials: true, // ✅ 세션 쿠키 포함
        }
      );
      alert("민원이 성공적으로 등록되었습니다.");
      setComplainTitle("");
      setComplainDescription("");
    } catch (error) {
      console.error("민원 등록 오류:", error);
      alert("민원 등록에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>문의 접수</Title>
      <Input
        type="text"
        placeholder="문의 제목"
        value={complainTitle}
        onChange={(e) => setComplainTitle(e.target.value)}
      />
      <TextArea
        placeholder="문의 내용"
        value={complainDescription}
        onChange={(e) => setComplainDescription(e.target.value)}
      />
      <Button onClick={postInquiry}>접수하기</Button>
    </Container>
  );
};
