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
      setNoticeData(location.state);
    }
  }, [location.state]);

  return (
    <>
      {/* ✅ noticeData를 NoticesInfor에 props로 전달 */}
      <NoticesInfor notice={noticeData} />
      <FormContainer>
        <Label>제목</Label>
        <FormTitle
          name="title"
          value={noticeData?.title || ""}
          onChange={(e) =>
            setNoticeData((prev) =>
              prev ? { ...prev, title: e.target.value } : null
            )
          }
          placeholder="제목을 입력해주세요."
        />
        <Label>파일 첨부</Label>
        <FormFileUpload onFileSelect={setFiles} />
        <Label>내용</Label>
        <FormContents
          name="fixed"
          value={noticeData?.fixed || ""}
          onChange={(e) =>
            setNoticeData((prev) =>
              prev ? { ...prev, fixed: e.target.value } : null
            )
          }
          placeholder="내용을 입력해주세요."
        />
      </FormContainer>
      <BtnGroup>
        <FormBackBtn>목록</FormBackBtn>
        <SubmitButton
          type="submit"
          onClick={() => {
            alert("ㅈㅈ");
          }}
        >
          수정사항 적용
        </SubmitButton>
      </BtnGroup>
    </>
  );
};
