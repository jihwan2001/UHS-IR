import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  max-width: 1000px;
  margin-bottom: 20px;
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const DeletePopUp = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 10px;
  width: 450px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 100;
  background-color: #fff;
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

// 게시물 관련 api 받아오기
const getContents = async (board_id: number) => {
  try {
    const response = await axios.get(
      `http://39.127.112.109:8080/api/board/list/${board_id}`
    );
    console.log("응답받은 데이터", response.data);
    return response.data;
  } catch (error) {
    console.log("오류 발생", error);
    throw error;
  }
};

const boardDelete = async (board_id: number) => {
  try {
    const response = await axios.post(
      `https://localhost:3000/api/board/delete/${board_id}`
    );
    console.log("요청 성공", response);
    alert("삭제되었습니다.");
  } catch (error) {
    console.error("삭제 요청 중 오류 발생:", error);
    alert("삭제 요청이 실패했습니다. 다시 시도해주세요.");
  }
};

interface NoticesContentsProps {
  setContentsBtnClicked: (value: boolean) => void;
  boardId: number;
}

interface BoardData {
  board_title: string;
  user_name: string;
  board_date: string; // 날짜를 string으로 처리
  board_description: string;
  schedul_title: string | null; // null 허용
  schedul_event_date: string | null; // null 허용
}

const NoticesContents = ({ setContentsBtnClicked }: NoticesContentsProps) => {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [boardData, setBoardData] = useState<BoardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContents(1); // 1은 예시로 사용하는 board_id
        setBoardData(data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = () => {
    setDeleteClicked((prev) => !prev);
  };

  const realHandleDeleteClick = async () => {
    try {
      await boardDelete(1); // 예시로 board_id = 1 사용
      setContentsBtnClicked(false); // 삭제 후 목록으로 이동
    } catch (error) {
      console.error("삭제 처리 중 오류:", error);
    }
  };

  const handleClick = () => {
    setContentsBtnClicked(false);
  };

  return (
    <>
      {/* {boardData ? ( */}
      <>
        <Container>
          <Title>
            제목
            {/*oardData.board_title*/}
          </Title>
          <Date>작성일: {/*boardData.board_date*/}</Date>
          <Details>내용: {/*boardData.board_description*/}</Details>
        </Container>
        <Container>
          <Title>연결된 학사 일정</Title>
          <Details>일정 제목: {/*boardData.schedul_title || "없음"*/}</Details>
          <Date>일정 날짜: {/*boardData.schedul_event_date || "없음"*/}</Date>
        </Container>
      </>
      {/* ) : (
        <div>데이터를 불러오는 중...</div>
      )} */}
      <ButtonGroup>
        <Button type="button" onClick={handleClick}>
          목록
        </Button>
        <Button type="button" onClick={handleDeleteClick}>
          삭제
        </Button>
      </ButtonGroup>
      {deleteClicked && (
        <>
          <Overlay />
          <DeletePopUp>
            <div>해당 공지사항을 삭제하겠습니까?</div>
            <ButtonGroup>
              <Button type="button" onClick={handleDeleteClick}>
                취소
              </Button>
              <Button type="button" onClick={realHandleDeleteClick}>
                삭제
              </Button>
            </ButtonGroup>
          </DeletePopUp>
        </>
      )}
    </>
  );
};

export default NoticesContents;
