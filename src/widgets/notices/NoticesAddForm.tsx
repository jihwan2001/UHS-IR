import { useState } from "react";
import { FormFileUpload } from "../../features";
import { FormBackBtn, FormContents, FormTitle } from "../../shared";
import { BtnGroup, FormContainer, Label, SubmitButton } from "./styles";

export const NoticesAddForm = () => {
  const [files, setFiles] = useState<File[]>([]); // 여러 개의 파일 상태 관리

  // 파일 변경 핸들러 (배열로 받음)
  const handleFileChange = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  return (
    <>
      <FormContainer>
        <Label>제목</Label>
        <FormTitle placeholder="제목을 입력해주세요." />
        <Label>파일 첨부</Label>
        <FormFileUpload onFileSelect={handleFileChange} />{" "}
        {/* 여러 개의 파일 전달 */}
        <Label>내용</Label>
        <FormContents placeholder="내용을 입력해주세요." />
      </FormContainer>
      <BtnGroup>
        <FormBackBtn>취소</FormBackBtn>
        <SubmitButton type="submit">작성</SubmitButton>
      </BtnGroup>
    </>
  );
};
