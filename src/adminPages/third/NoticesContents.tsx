import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  margin-bottom: 20px;
  max-width: 1000px;
  padding: 20px;
  background-color: #fff;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #6c757d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #5a6268;
  }
  &:last-child {
    background-color: #ff8a8a;
    &:hover {
      background-color: #c46a6a;
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Date = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
  color: #4a4a4a;
`;

const Details = styled.div`
  font-size: 24px;
  margin-bottom: 15px;
`;

interface NoticesContentsProps {
  setContentsBtnClicked: (value: boolean) => void;
  boardId: number | null;
}

interface BoardData {
  boardTitle: string;
  userName: string;
  boardDate: string;
  boardDescription: string;
  schedulTitle?: string | null; // 🔹 학사 일정 제목
  schedulStartEventDate?: string | null; // 🔹 학사 일정 시작 날짜
  schedulEndEventDate?: string | null; // 🔹 학사 일정 종료 날짜
}

// 🔹 공지사항 정보 가져오기 (boardId 기반)
const getContents = async (boardId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/board/list/${boardId}`
    );
    console.log("🔎 공지사항 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("🔴 공지사항 데이터 가져오기 실패:", error);
    throw error;
  }
};

// 공지사항 정보 삭제하기
const deleteContents = async (
  boardId: number,
  setContentsBtnClicked: (value: boolean) => void
) => {
  if (!window.confirm("정말 삭제하시겠습니까?")) {
    return; // 사용자가 취소하면 삭제 중단
  }

  try {
    const response = await axios.delete(
      `http://localhost:8080/api/board/delete/${boardId}`
    );
    console.log("✅ 삭제 성공:", response.data);

    alert("공지사항이 삭제되었습니다.");
    window.location.reload();
    setContentsBtnClicked(false); // 목록으로 이동
  } catch (error) {
    console.error("❌ 삭제 실패:", error);
    alert("삭제에 실패했습니다.");
  }
};

const NoticesContents = ({
  setContentsBtnClicked,
  boardId,
}: NoticesContentsProps) => {
  const [boardData, setBoardData] = useState<BoardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (boardId === null) {
        console.error("🔴 boardId가 null입니다.");
        return;
      }

      try {
        // ✅ 공지사항 데이터 가져오기 (이 데이터에 일정 정보도 포함됨)
        const board = await getContents(boardId);
        setBoardData(board);
      } catch (error) {
        console.error("🔴 데이터 로드 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [boardId]);

  return (
    <>
      {boardData ? (
        <>
          <Container>
            <Title>{boardData.boardTitle}</Title>
            <Date>{boardData.boardDate}</Date>
            <Details>{boardData.boardDescription}</Details>
          </Container>
          <Container>
            <Title>연결된 학사 일정</Title>
            <Details>일정 제목: {boardData.schedulTitle || "없음"}</Details>
            <Date>
              일정 시작 날짜: {boardData.schedulStartEventDate || "없음"}
            </Date>
            <Date>
              일정 종료 날짜: {boardData.schedulEndEventDate || "없음"}
            </Date>
          </Container>
        </>
      ) : (
        <div>데이터를 불러오는 중...</div>
      )}
      <ButtonGroup>
        <Button onClick={() => setContentsBtnClicked(false)}>목록</Button>
        <Button
          onClick={() =>
            boardId !== null && deleteContents(boardId, setContentsBtnClicked)
          }
        >
          삭제
        </Button>
      </ButtonGroup>
    </>
  );
};

export default NoticesContents;
