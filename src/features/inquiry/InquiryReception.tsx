import React, { useState } from "react";
import { Button, Container, Input, TextArea, Title } from "./styles";

export const InquiryReception = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    alert(`제목: ${title}\n내용: ${content}`);
  };

  return (
    <Container>
      <Title>문의 접수</Title>
      <Input
        type="text"
        placeholder="문의 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        placeholder="문의 내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleSubmit}>접수하기</Button>
    </Container>
  );
};
