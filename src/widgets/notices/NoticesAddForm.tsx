import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormFileUpload } from "../../features";
import { FormBackBtn, FormContents, FormTitle } from "../../shared";
import { BtnGroup, FormContainer, Label, SubmitButton } from "./styles";
import { NoticesAddRequest } from "./model";
import { useRecoilValue } from "recoil";
import { authState } from "../../authAtom";

export const NoticesAddForm = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const [formData, setFormData] = useState<NoticesAddRequest>({
    boardTitle: "",
    boardDescription: "",
    boardDate: new Date().toISOString().split("T")[0],
    isPinned: false,
    userAccount: auth.userAccount,
    userName: auth.username,
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 서버 전송 직전 formData:", formData);

    // ✅ DTO 데이터를 JSON 문자열로 변환
    const dtoData = {
      boardTitle: formData.boardTitle,
      boardDescription: formData.boardDescription,
      boardDate: formData.boardDate,
      isPinned: formData.isPinned,
      userAccount: formData.userAccount,
      userName: formData.userName,
    };

    const formDataToSend = new FormData();
    formDataToSend.append(
      "dto",
      new Blob([JSON.stringify(dtoData)], { type: "application/json" })
    ); // ✅ JSON 데이터 추가

    files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      await axios.post("http://localhost:8080/api/board/add", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("공지사항이 성공적으로 추가되었습니다.");
      navigate("/datacenter");
    } catch (error) {
      console.error("공지사항 추가 실패:", error);
      alert("공지사항 추가에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (auth?.userAccount) {
      setFormData((prev) => ({
        ...prev,
        userAccount: auth.userAccount,
        userName: auth.username,
      }));
    }
  }, [auth]);

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Label>제목</Label>
        <FormTitle
          name="boardTitle"
          value={formData.boardTitle}
          onChange={handleChange}
          placeholder={"제목을 입력해 주세요"}
        />

        <Label>파일 첨부</Label>
        <FormFileUpload onFileSelect={setFiles} />

        <Label>내용</Label>
        <FormContents
          name="boardDescription"
          value={formData.boardDescription}
          onChange={handleChange}
          placeholder={"내용을 입력해 주세요"}
        />
      </FormContainer>

      <BtnGroup>
        <FormBackBtn>취소</FormBackBtn>
        <SubmitButton type="submit">작성</SubmitButton>
      </BtnGroup>
    </form>
  );
};
