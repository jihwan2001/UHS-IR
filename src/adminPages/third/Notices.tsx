import styled from "styled-components";
import find from "../../img/find.png";
import { useEffect, useState } from "react";
import NoticesAdd from "./NoticesAdd";
import NoticesContents from "./NoticesContents";
import { getSearch, getInfo } from "../../api/notice";

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
interface BoardData {
  boardId: number;
  boardTitle: string;
  userName: string;
  boardDate: string;
}

const Notices = () => {
  const [boardData, setBoardData] = useState<BoardData[]>([]); // 현재 페이지 데이터
  const [pageNum, setPageNum] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [searchedData, setSearchedData] = useState(""); // 검색어
  const [isSearching, setIsSearching] = useState(false); // 검색 중인지 여부

  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null); // 선택된 boardId 상태

  const [addBtnClicked, setAddBtnClicked] = useState(false); // 만들기 버튼 클릭 시
  const [contentsBtnClicked, setContentsBtnClicked] = useState(false); // 게시물 클릭 시
  const handleAddClick = () => {
    setAddBtnClicked(true);
    setContentsBtnClicked(false);
  };
  const handleContentsClick = (boardId: number) => {
    setSelectedBoardId(boardId); // 클릭된 게시물의 ID 저장
    setContentsBtnClicked(true);
    setAddBtnClicked(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfo(pageNum); // 페이지 번호에 따른 데이터 가져오기
        setBoardData(data.content || []); // 현재 페이지 데이터 설정
        setTotalPages(data.totalPages || 1); // 전체 페이지 수 설정
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, [pageNum]);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchedData.trim()) {
        setIsSearching(false);
        setPageNum(1);
        const data = await getInfo(1);
        setBoardData(data.content || []);
        setTotalPages(data.totalPages || 1);
        return;
      }

      try {
        setIsSearching(true);
        setPageNum(1);
        const data = await getSearch(searchedData);
        setBoardData(data.slice(0, 10)); // 검색 결과 최대 10개 표시
        setTotalPages(Math.ceil(data.length / 10));
      } catch (error) {
        console.error("❌ 검색 요청 중 오류:", error);
      }
    };

    fetchData();
  }, [searchedData]);

  const handlePageChange = (page: number) => setPageNum(page); // 페이지 변경 핸들러

  return (
    <>
      {!addBtnClicked && !contentsBtnClicked && (
        <>
          <Header>
            <SearchContainer>
              <SearchIcon src={find} alt="Search icon" />
              <SearchData
                type="text"
                placeholder="검색어를 입력하세요..."
                onChange={(e) => {
                  setSearchedData(e.target.value); // 검색어 업데이트
                  setPageNum(1); // 검색 시 첫 페이지로 이동
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

          {/* 데이터 표시 */}
          {boardData.length === 0
            ? isSearching && (
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                  🔍 검색 결과가 없습니다.
                </p>
              )
            : boardData.map((data) => (
                <ContentsContainer
                  key={data.boardId}
                  onClick={() => handleContentsClick(data.boardId)}
                >
                  <ContentTitle>{data.boardTitle}</ContentTitle>
                  <ContentDetails>{data.userName}</ContentDetails>
                  <ContentDate>{data.boardDate}</ContentDate>
                </ContentsContainer>
              ))}

          {/* 페이지네이션 */}
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
      {contentsBtnClicked && selectedBoardId !== null && (
        <NoticesContents
          setContentsBtnClicked={setContentsBtnClicked}
          boardId={selectedBoardId} // 선택된 boardId 전달
        />
      )}
    </>
  );
};

export default Notices;
