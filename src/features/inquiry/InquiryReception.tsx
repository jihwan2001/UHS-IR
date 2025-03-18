import { Button, Container, Input, TextArea, Title } from "./styles";
import { usePostInquiry } from "./hooks/PostInquiry";

export const InquiryReception = () => {
  const {
    complainTitle,
    setComplainTitle,
    complainDescription,
    setComplainDescription,
    postInquiry,
  } = usePostInquiry();
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