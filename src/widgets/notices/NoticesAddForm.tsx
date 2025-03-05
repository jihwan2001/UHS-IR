import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormFileUpload } from "../../features";
import { FormBackBtn, FormContents, FormTitle } from "../../shared";
import { BtnGroup, FormContainer, Label, SubmitButton } from "./styles";
import { NoticeAddRequest } from "./model";

export const NoticesAddForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NoticeAddRequest>({
    boardTitle: "",
    boardDescription: "",
    boardDate: new Date().toISOString().split("T")[0], // 오늘 날짜 기본값
    isPinned: false,
    user: "Admin", // 기본값 (추후 사용자 정보 필요 시 변경 가능)
  });
  const [files, setFiles] = useState<File[]>([]);

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 파일 변경 핸들러
  const handleFileChange = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  // ✅ 공지사항 추가 API 호출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("boardTitle", formData.boardTitle);
    formDataToSend.append("boardDescription", formData.boardDescription);
    formDataToSend.append("boardDate", formData.boardDate);
    formDataToSend.append("user", formData.user);

    // ✅ 여러 개의 파일 추가
    files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/board/add",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("공지사항 추가 성공:", response.data);
      alert("공지사항이 성공적으로 추가되었습니다.");
      navigate("/datacenter"); // ✅ 추가 후 목록으로 이동
    } catch (error) {
      console.error("공지사항 추가 실패:", error);
      alert("공지사항 추가에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Label>제목</Label>
        <FormTitle
          name="boardTitle"
          value={formData.boardTitle}
          onChange={handleChange}
          placeholder="제목을 입력해주세요."
        />

        <Label>파일 첨부</Label>
        <FormFileUpload onFileSelect={handleFileChange} />

        <Label>내용</Label>
        <FormContents
          name="boardDescription"
          value={formData.boardDescription}
          onChange={handleChange}
          placeholder="내용을 입력해주세요."
        />
      </FormContainer>

      <BtnGroup>
        <FormBackBtn>취소</FormBackBtn>
        <SubmitButton type="submit">작성</SubmitButton>
      </BtnGroup>
    </form>
  );
};
