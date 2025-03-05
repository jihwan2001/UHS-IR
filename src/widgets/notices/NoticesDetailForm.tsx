import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FormFileUpload, NoticesInfor } from "../../features";
import { FormTitle, FormContents, FormBackBtn } from "../../shared";
import { BtnGroup, FormContainer, Label, SubmitButton } from "./styles";
import { NoticeItem } from "./model";

export const NoticesDetailForm = () => {
  const location = useLocation();
  const [noticeData, setNoticeData] = useState<NoticeItem | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (location.state) {
      setNoticeData(location.state); // ✅ 현재 state에서 데이터 가져오기
    }
  }, [location.state]);

  return (
    <>
      {/* ✅ 공지사항 정보 표시 */}
      <NoticesInfor notice={noticeData} />
      <FormContainer>
        <Label>제목</Label>
        <FormTitle
          name="boardTitle"
          value={noticeData?.boardTitle || ""}
          placeholder="제목을 입력해주세요."
        />
        <Label>파일 첨부</Label>
        <FormFileUpload onFileSelect={setFiles} /> {/* 파일 업로드 비활성화 */}
        <Label>내용</Label>
        <FormContents
          name="boardDescription"
          value={noticeData?.boardDescription || ""}
          placeholder="내용을 입력해주세요."
        />
      </FormContainer>

      <BtnGroup>
        <FormBackBtn>목록</FormBackBtn>
        <SubmitButton type="submit">수정사항 적용</SubmitButton>
      </BtnGroup>
    </>
  );
};
