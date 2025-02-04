import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ComplaintsManagementContents from "./ComplaintsManagementContents";

// UI 스타일을 정의하는 컴포넌트
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const InfoContainer = styled.div`
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  padding: 15px;
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const InfoTitle = styled.div`
  flex: 4;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const InfoDetails = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
`;

const ContentsContainer = styled.div`
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ContentTitle = styled.div`
  flex: 4;
  font-size: 16px;
`;

const ContentDetails = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
`;

const ContentDate = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 5px 10px;
  border: none;
  background-color: ${({ $active }) => ($active ? "#007bff" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#007bff")};
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

// 민원 데이터 구조를 정의하는 인터페이스
interface Complaint {
  complainId: number;
  complainTitle: string;
  complainDept: string;
  complainState: string;
  userName: string;
  complainDate: string; 
  
}

const getInfo = async (
  pageNum: number,
  complainType: string,
  processStatus: string
) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/complain/list",
      {
        params: {
          state: processStatus || null, // 처리 상태 필터
          dept: complainType || null, // 민원 유형 필터
          pageNum: pageNum, // 현재 페이지 번호
        },
      }
    );

    console.log(`📌 Page ${pageNum} 데이터:`, response.data);
    console.log(`개수 :`, response.data.length);

    return response.data; // 전체 응답 반환
  } catch (error) {
    console.error("❌ 응답 처리 오류:", error);
    throw error;
  }
};

const ComplaintsManagement = () => {
 // 상태 관리: 민원 데이터
 const [complains, setComplaints] = useState<Complaint[]>([]);
 // 상태 관리: 현재 페이지 번호
 const [pageNum, setPageNum] = useState(1);
 const [totalPages, setTotalPages] = useState(1); //수정
 // 상태 관리: 민원 유형 필터
 const [complainType, setComplaintType] = useState("");
 // 상태 관리: 처리 상태 필터
 const [processStatus, setProcessStatus] = useState("");

 const [contentsBtnClicked, setContentsBtnClicked] = useState(false);
  const [selectedComplainId, setSelectedComplainId] = useState<number | null>(null);
  const handleContentsClick = (complainId: number) => {
    setSelectedComplainId(complainId);
    setContentsBtnClicked(true);
  };

  const filteredData =
  complainType === "" && processStatus === ""
    ? complains // 필터가 없으면 전체 데이터 표시
    : complains.filter((data) => {
        const matchesType =
          complainType === "" ||
          data.complainDept.toLowerCase() === complainType.toLowerCase();
        const matchesStatus =
          processStatus === "" ||
          data.complainState.toLowerCase() === processStatus.toLowerCase();
        return matchesType && matchesStatus;
      });

  // const startIndex = (pageNum - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
// const currentData = filteredData.slice(startIndex, endIndex);

  // const totalPages = Math.max(1, Math.ceil(complains.length / itemsPerPage));
  const handlePageChange = (page: number) => {
    setPageNum(page); // 페이지 번호 변경
  };

  // 민원 데이터를 API에서 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출 (페이지네이션 & 필터링 적용)
        const data = await getInfo(pageNum, complainType, processStatus);

        console.log("📌 API에서 받은 데이터:", data); // 데이터 구조 확인

        // 데이터가 배열인지 확인 후 처리
        if (Array.isArray(data)) {
          setComplaints(data); // ✅ API 응답이 배열이면 그대로 저장
          setTotalPages(1); // ✅ 배열일 경우 기본적으로 1페이지로 설정 (추가 처리 가능)
        } else if (data.content && Array.isArray(data.content)) {
          setComplaints(data.content); // ✅ 기존 구조(data.content)가 존재하면 저장
          setTotalPages(data.totalPages || 1); // ✅ totalPages 값도 함께 설정
        } else {
          setComplaints([]); // 데이터가 없을 경우 빈 배열 저장
          setTotalPages(1);
        }
      } catch (error) {
        console.error("❌ 데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, [pageNum, complainType, processStatus]); // ✅ pageNum, 필터 변경 시 API 호출
  
  useEffect(() => {
    console.log("🔍 필터링된 데이터:", filteredData);
  }, [filteredData]); // filteredData가 변경될 때마다 실행
  // 민원 유형 필터 변경 핸들러
  const handleComplaintTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setComplaintType(e.target.value);
    setPageNum(1);
  };

  // 처리 상태 필터 변경 핸들러
  const handleProcessStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProcessStatus(e.target.value);
    setPageNum(1);
  };

  return (
    <>
      {!contentsBtnClicked && (
        <>
          {" "}
          {/* 필터 섹션 */}
          <Header>
            <Select value={complainType} onChange={handleComplaintTypeChange}>
              <option value="">민원유형</option>
              <option value="0">행정</option>
              <option value="1">시설</option>
              <option value="2">안전</option>
              <option value="3">교육</option>
              <option value="4">운영</option>
            </Select>
            <Select value={processStatus} onChange={handleProcessStatusChange}>
              <option value="">처리상태</option>
              <option value="0">대기중</option>
              <option value="1">처리됨</option>
            </Select>
          </Header>
          {/* 민원 목록 헤더 */}
          <InfoContainer>
            <InfoTitle>제목</InfoTitle>
            <InfoDetails>민원유형</InfoDetails>
            <InfoDetails>처리상태</InfoDetails>
            <InfoDetails>담당자</InfoDetails>
            <InfoDetails>일자</InfoDetails>
          </InfoContainer>
          {/* 민원 데이터 표시 */}
          {filteredData.map((complain) => (
            <ContentsContainer key={complain.complainId} onClick={()=>{handleContentsClick(complain.complainId)}}>
              <ContentTitle>{complain.complainTitle}</ContentTitle>
              <ContentDetails>{complain.complainDept}</ContentDetails>
              <ContentDetails>{complain.complainState}</ContentDetails>
              <ContentDetails>{complain.userName}</ContentDetails>
              <ContentDate>{complain.complainDate}</ContentDate>
            </ContentsContainer>
          ))}
          {/* 위에거 api확인 안돼서 밑에 거로 확인하기
          <ContentsContainer onClick={handleContentsClick}>
            <ContentTitle>2025 게시글 제목 1</ContentTitle>
            <ContentDetails>행정</ContentDetails>
            <ContentDetails>대기중</ContentDetails>
            <ContentDetails>황을선</ContentDetails>
            <ContentDate>2025.01.01</ContentDate>
          </ContentsContainer> */}
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
            $active={pageNum === index + 1}
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
      {contentsBtnClicked && (
        <ComplaintsManagementContents
          SetContentsBtnClicked={setContentsBtnClicked}
          complainId = {selectedComplainId}
        />
      )}
    </>
  );
};

export default ComplaintsManagement;