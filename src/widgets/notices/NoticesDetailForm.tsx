import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { NoticesInfor } from "../../features";
import { FormTitle, FormContents, FormBackBtn } from "../../shared";
import { BtnGroup, FormContainer, Label, SubmitButton } from "./styles";
import { NoticeItem, NoticesDetailRequest } from "./model";
import { useUpdateNotice } from "./hooks/NoticesPuttHooks";
import axios from "axios";

export const NoticesDetailForm = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>(); // ✅ URL에서 ID 가져오기
  const [noticeData, setNoticeData] = useState<NoticeItem | null>(
    location.state || null
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<number>(1); // ✅ 기본값 추가
  const [fileIds, setFileIds] = useState<number[]>([]);

  useEffect(() => {
    if (!location.state && id) {
      const fetchNoticeDetail = async () => {
        try {
          const response = await axios.get<NoticeItem>(
            `http://localhost:8080/api/board/list/${id}`
          );
          setNoticeData(response.data);
          setTitle(response.data.boardTitle);
          setDescription(response.data.boardDescription);
          setUserId(response.data.userId || 1); // ✅ 기본값 설정
          setFileIds(response.data.fileId ? [response.data.fileId] : []);
        } catch (error) {
          console.error("공지사항 상세 불러오기 오류:", error);
        }
      };
      fetchNoticeDetail();
    } else if (location.state) {
      setTitle(location.state.boardTitle);
      setDescription(location.state.boardDescription);
      setUserId(location.state.userId || 1); // ✅ 기본값 설정
      setFileIds(location.state.fileId ? [location.state.fileId] : []);
    }
  }, [id, location.state]);

  const { handleUpdate, loading } = useUpdateNotice(
    id,
    title,
    description,
    userId,
    fileIds
  );

  if (!noticeData) {
    return <div>공지사항 데이터를 불러오는 중...</div>;
  }

  return (
    //onsubmit 해야해
    <form>
      <NoticesInfor notice={noticeData} />
      <FormContainer>
        <Label>제목</Label>
        <FormTitle
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={""}
        />

        <Label>내용</Label>
        <FormContents
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={""}
        />
      </FormContainer>

      <BtnGroup>
        <FormBackBtn>목록</FormBackBtn>
        <SubmitButton type="button" onClick={handleUpdate} disabled={loading}>
          {loading ? "수정 중..." : "수정사항 적용"}
        </SubmitButton>
      </BtnGroup>
    </form>
  );
};
