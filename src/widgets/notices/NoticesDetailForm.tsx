import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { NoticesInfor } from "../../features";
import { FormTitle, FormContents, FormBackBtn } from "../../shared";
import { BtnGroup, FormContainer, Label, SubmitButton } from "./styles";
import { NoticeItem } from "./model";
import { useUpdateNotice } from "./hooks/NoticesPuttHooks";
import axios from "axios";

export const NoticesDetailForm = () => {
  const location = useLocation();
  const noticeState = location.state as NoticeItem | null;
  const boardId = noticeState?.boardId?.toString() ?? "";

  // ✅ 모든 훅은 조건 없이 무조건 실행
  const [noticeData, setNoticeData] = useState<NoticeItem | null>(noticeState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<number>(3);
  const [files, setFiles] = useState<File[]>([]);
  const [fileIds, setFileIds] = useState<
    { fileId: number; fileName: string }[]
  >([]);
  const hasIncreasedView = useRef(false);

  const { handleUpdate, loading } = useUpdateNotice(
    boardId,
    title,
    description,
    userId,
    fileIds.map((file) => file.fileId),
    files
  );

  useEffect(() => {
    if (!boardId || hasIncreasedView.current) return;

    axios
      .put(
        `http://localhost:8080/api/board/view/${boardId}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        hasIncreasedView.current = true;
      })
      .catch((error) => console.error("조회수 증가 실패:", error));
  }, [boardId]);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await axios.get<NoticeItem>(
          `http://localhost:8080/api/board/list/${boardId}`
        );
        setNoticeData(response.data);
        setTitle(response.data.boardTitle);
        setDescription(response.data.boardDescription);
        setUserId(response.data.userId || 3);
        setFileIds(
          response.data.files?.map((file) => ({
            fileId: file.fileId,
            fileName: file.fileName,
          })) || []
        );
      } catch (error) {
        console.error("공지사항 상세 불러오기 오류:", error);
      }
    };

    if (!noticeState && boardId) {
      fetchNoticeDetail();
    } else if (noticeState) {
      setTitle(noticeState.boardTitle);
      setDescription(noticeState.boardDescription);
      setUserId(noticeState.userId || 3);
      setFileIds(
        noticeState.files?.map((file) => ({
          fileId: file.fileId,
          fileName: file.fileName,
        })) || []
      );
    }
  }, [boardId, noticeState]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleRemoveFile = (fileIdToRemove: number) => {
    setFileIds((prev) => prev.filter((file) => file.fileId !== fileIdToRemove));
  };
  
  // ✅ boardId가 없으면 렌더링만 조건 분기
  if (!boardId) {
    return <div>❗boardId가 없어 페이지를 표시할 수 없습니다.</div>;
  }

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
          placeholder=""
        />

        <Label>내용</Label>
        <FormContents
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=""
        />

        <Label>파일 추가</Label>
        <input type="file" multiple onChange={handleFileChange} />

        <Label>첨부 파일</Label>
          {fileIds.length > 0 ? (
            <ul>
              {fileIds.map((file) => (
                <li key={file.fileId} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <a
                    href={`http://localhost:8080/api/board/files/download/${file.fileId}`}
                    download
                  >
                    {file.fileName}
                  </a>
                  {/* ❌ 삭제(X) 버튼 */}
                  <button
                    onClick={() => handleRemoveFile(file.fileId)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "red",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    title="삭제"
                  >
                    ✕
                  </button>
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
