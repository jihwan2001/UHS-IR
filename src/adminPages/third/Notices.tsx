import styled from "styled-components";
import find from "../../img/find.png";
import axios from "axios";
import { useEffect, useState } from "react";
import NoticesAdd from "./NoticesAdd";
import NoticesContents from "./NoticesContents";

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// SearchData를 감싸는 컨테이너
const SearchContainer = styled.div`
  position: relative;
  flex: 1; /* 검색창이 버튼과 나란히 배치될 때 크기를 차지 */
`;

const SearchData = styled.input`
  width: 100%; /* 부모 컨테이너의 너비에 맞춤 */
  max-width: 1200px; /* 검색창의 최대 너비 */
  padding: 10px 10px 10px 40px; /* 왼쪽 여백 추가 */
  font-size: 16px; /* 폰트 크기 설정 */
  border: 1px solid #ccc; /* 테두리 스타일 */
  border-radius: 4px; /* 둥근 테두리 */
  outline: none; /* 클릭 시 파란 테두리 제거 */
  &:focus {
    border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 포커스 시 그림자 효과 */
  }
`;

const AddContents = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #1bd130; /* 버튼 색상 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #10741c; /* 마우스 오버 시 색상 */
  }
`;
// input 내부에 배치되는 이미지
const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 20px; /* 아이콘 크기 설정 */
  height: 20px; /* 아이콘 크기 설정 */
  pointer-events: none; /* 아이콘 클릭 방지 */
`;

const InfoContainer = styled.div`
  border: 1px solid #ddd; /* 연한 테두리 */
  border-left: 0;
  border-right: 0;
  padding: 15px; /* 내부 여백 */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  margin: 20px 0; /* 상하 간격 */
`;

const InfoTitle = styled.div`
  flex: 4; /* 제목 열의 너비 */
  font-size: 18px; /* 제목 크기 */
  font-weight: bold;
  color: #333;
`;

const InfoDetails = styled.div`
  flex: 1; /* 작성자 열의 너비 */
  text-align: center; /* 가운데 정렬 */
  font-size: 14px;
  font-weight: bold;
`;

const ContentsContainer = styled.div`
  border: 1px solid #ddd; /* 연한 테두리 */
  border-left: 0;
  border-right: 0;
  padding: 15px; /* 내부 여백 */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  cursor: pointer;
`;

const ContentTitle = styled.div`
  flex: 4; /* 제목 열의 너비 */
  font-size: 16px;
`;

const ContentDetails = styled.div`
  flex: 1; /* 작성자 열의 너비 */
  text-align: center; /* 가운데 정렬 */
  font-size: 14px;
`;

const ContentDate = styled.div`
  flex: 1; /* 일자 열의 너비 */
  text-align: center; /* 가운데 정렬 */
  font-size: 14px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 5px 10px;
  border: none;
  background-color: ${({ active }) => (active ? "#007bff" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#007bff")};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
  &:disabled {
    background-color: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const getInfo = async (pageNum: number) => {
  try {
    const response = await axios.get("https://localhost:8080/api/board/list", {
      params: { pageNum },
    });
    return response.data;
  } catch (error) {
    console.error("응답 처리 오류:", error);
    throw error;
  }
};

interface BoardData {
  board_id: number;
  board_title: string;
  user_name: string;
  board_date: string;
}

const Notices = () => {
  const [boardData, setBoardData] = useState<BoardData[]>([]); // 받아온 데이터를 저장 하는 곳
  const [pageNum, setPageNum] = useState(1); // 페이지 번호를 저장 하는 곳

  const [searchedData, setSearchedData] = useState(""); // 검색창에 입력된 검색어를 저장 하는 곳

  const filteredData = boardData.filter((data) =>
    data.board_title.toLowerCase().includes(searchedData.toLowerCase())
  ); // 검색후 필터링된 데이터

  const itemsPerPage = 10; // 페이지당 게시글 수
  // 페이지에 해당하는 데이터 계산
  const startIndex = (pageNum - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.max(1, Math.ceil(boardData.length / itemsPerPage));
  const handlePageChange = (page: number) => {
    setPageNum(page); // 페이지 번호 변경
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfo(pageNum);
        setBoardData(data);
      } catch (error) {
        console.log("데이터 가져오기 실패", error);
      }
    };
    fetchData();
  }, [pageNum]);

  const [addBtnClicked, setAddBtnClicked] = useState(false); // 만들기 버튼 클릭 시
  const [contentsBtnClicked, setContentsBtnClicked] = useState(false); // 게시물 클릭 시
  const handleAddClick = () => {
    setAddBtnClicked(true);
    setContentsBtnClicked(false);
  };
  const handleContentsClick = () => {
    setContentsBtnClicked(true);
  };

  return (
    <>
      {!addBtnClicked && !contentsBtnClicked && (
        <>
          <Header>
            {/* 검색어 입력 */}
            <SearchContainer>
              <SearchIcon src={find} alt="Search icon" />
              <SearchData
                type="text"
                placeholder="검색어를 입력하세요..."
                onChange={(e) => {
                  setSearchedData(e.target.value); // 검색어 업데이트
                  setPageNum(1); // 검색어 변경 시 페이지 번호 초기화
                }}
              />
            </SearchContainer>
            <AddContents onClick={handleAddClick}>+ 만들기</AddContents>
          </Header>
          <InfoContainer>
            <InfoTitle>제목</InfoTitle>
            <InfoDetails>작성자</InfoDetails>
            <InfoDetails>일자</InfoDetails>
          </InfoContainer>

          {/* 활성화된 데이터 표시 */}
          {currentData.map((data) => (
            <ContentsContainer
              key={data.board_id}
              onClick={handleContentsClick}
            >
              <ContentTitle>{data.board_title}</ContentTitle>
              <ContentDetails>{data.user_name}</ContentDetails>
              <ContentDate>{data.board_date}</ContentDate>
            </ContentsContainer>
          ))}

          {/* 임의의 데이터 값 넣어놓음 */}
          <ContentsContainer onClick={handleContentsClick}>
            <ContentTitle>2025 게시글 제목1</ContentTitle>
            <ContentDetails>황을선</ContentDetails>
            <ContentDate>2025.01.10</ContentDate>
          </ContentsContainer>
          <ContentsContainer>
            <ContentTitle>2025 게시글 제목2</ContentTitle>
            <ContentDetails>홍길동</ContentDetails>
            <ContentDate>2025.01.11</ContentDate>
          </ContentsContainer>
          {/* 추가 게시글 */}

          {/* 페이지네이션 UI */}
          <Pagination>
            <PageButton
              disabled={pageNum === 1}
              onClick={() => handlePageChange(pageNum - 1)}
            >
              &lt;
            </PageButton>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageButton
                key={index + 1}
                active={pageNum === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
            <PageButton
              disabled={pageNum === totalPages}
              onClick={() => handlePageChange(pageNum + 1)}
            >
              &gt;
            </PageButton>
          </Pagination>
        </>
      )}
      {addBtnClicked && <NoticesAdd setAddBtnClicked={setAddBtnClicked} />}
      {contentsBtnClicked && (
        <NoticesContents setContentsBtnClicked={setContentsBtnClicked} />
      )}
    </>
  );
};

export default Notices;
