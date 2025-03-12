import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { NoticesInfor } from "../../features";
import { FormTitle, FormContents, FormBackBtn } from "../../shared";
import { BtnGroup, FormContainer, Label, SubmitButton } from "./styles";
import { NoticeItem } from "./model";
import { useUpdateNotice } from "./hooks/NoticesPuttHooks";
import axios from "axios";

export const NoticesDetailForm = () => {
  const location = useLocation();
  const { boardId } = useParams<{ boardId: string }>();
  const [noticeData, setNoticeData] = useState<NoticeItem | null>(
    location.state || null
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<number>(3);
  const [files, setFiles] = useState<File[]>([]); // ✅ File[]로 변경
  const [fileIds, setFileIds] = useState<
    { fileId: number; fileName: string }[]
  >([]);
  const hasIncreasedView = useRef(false);
  const [notice, setNotice] = useState<NoticeItem | null>(null);

  useEffect(() => {
    if (!hasIncreasedView.current) {
      axios
        .put(
          `http://localhost:8080/api/board/view/${boardId}`,
          {},
          {
            // ✅ 빈 객체 추가
            headers: {
              "Content-Type": "application/json", // ✅ 필요 최소한의 헤더만 포함
            },
          }
        )
        .then(() => {
          hasIncreasedView.current = true;
        })
        .catch((error) => console.error("조회수 증가 실패:", error));
    }

    axios
      .get(`/api/board/list/${boardId}`)
      .then((response) => setNotice(response.data))
      .catch((error) => console.error("공지사항 불러오기 실패:", error));
  }, [boardId]);

  useEffect(() => {
    if (!location.state && boardId) {
      const fetchNoticeDetail = async () => {
        try {
          if (!boardId) {
            console.error("❌ boardId가 undefined입니다.");
            return;
          }

          console.log(`📌 Fetching notice details for boardId: ${boardId}`);
          const response = await axios.get<NoticeItem>(
            `http://localhost:8080/api/board/list/${boardId}`
          );
          setNoticeData(response.data);
          setTitle(response.data.boardTitle);
          setDescription(response.data.boardDescription);
          setUserId(response.data.userId || 3);
          setFileIds(
            response.data.files?.map(
              (file: { fileId: number; fileName: string }) => ({
                fileId: file.fileId,
                fileName: file.fileName,
              })
            ) || []
          );
        } catch (error) {
          console.error("공지사항 상세 불러오기 오류:", error);
        }
      };

      fetchNoticeDetail();
    } else if (location.state) {
      setTitle(location.state.boardTitle);
      setDescription(location.state.boardDescription);
      setUserId(location.state.userId || 3);
      setFileIds(
        location.state.files?.map(
          (file: { fileId: number; fileName: string }) => ({
            fileId: file.fileId,
            fileName: file.fileName,
          })
        ) || []
      );
    }
  }, [boardId, location.state]);

  // ✅ 파일 업로드 핸들러 (새로운 파일 추가)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const { handleUpdate, loading } = useUpdateNotice(
    boardId,
    title,
    description,
    userId,
    fileIds.map((file) => file.fileId), // ✅ 기존 fileIds 배열 유지
    files // ✅ 올바른 File[] 형태로 전달
  );

  if (!noticeData) {
    return <div>공지사항 데이터를 불러오는 중...</div>;
  }

  return (
    <>
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

        {/* ✅ 파일 업로드 추가 */}
        <Label>파일 추가</Label>
        <input type="file" multiple onChange={handleFileChange} />

        {/* ✅ 기존 파일 목록 표시 - 파일명으로 표시 */}
        <Label>첨부 파일</Label>
        {fileIds.length > 0 ? (
          <ul>
            {fileIds.map((file) => (
              <li key={file.fileId}>
                <a
                  href={`http://localhost:8080/api/board/files/download/${file.fileId}`}
                  download
                >
                  {file.fileName} {/* ✅ 파일명으로 표시 */}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>첨부 파일 없음</p>
        )}
      </FormContainer>

      <BtnGroup>
        <FormBackBtn>목록</FormBackBtn>
        <SubmitButton type="button" onClick={handleUpdate} disabled={loading}>
          {loading ? "수정 중..." : "수정사항 적용"}
        </SubmitButton>
      </BtnGroup>
    </>
  );
};
