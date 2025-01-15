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

// 민원 데이터 구조를 정의하는 인터페이스
interface Complaint {
  cm_id: number;
  cm_title: string;
  cm_dept: string;
  cm_state: string;
  user_name: string;
  cm_date: string;
}

const ComplaintsManagement = () => {
  // 상태 관리: 민원 데이터
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  // 상태 관리: 현재 페이지 번호
  const [pageNum, setPageNum] = useState(1);
  // 상태 관리: 민원 유형 필터
  const [complaintType, setComplaintType] = useState("");
  // 상태 관리: 처리 상태 필터
  const [processStatus, setProcessStatus] = useState("");

  const [contentsBtnClicked, SetContentsBtnClicked] = useState(false);

  const handleContentsClick = () => {
    SetContentsBtnClicked(true);
  };
  const itemsPerPage = 10; // 페이지당 게시글 수

  const filteredData = complaints.filter((data) => {
    const matchesType =
      complaintType === "" ||
      data.cm_dept.toLowerCase() === complaintType.toLowerCase();
    const matchesStatus =
      processStatus === "" ||
      data.cm_state.toLowerCase() === processStatus.toLowerCase();
    return matchesType && matchesStatus;
  }); // 필터된 데이터

  const startIndex = (pageNum - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.max(1, Math.ceil(complaints.length / itemsPerPage));
  const handlePageChange = (page: number) => {
    setPageNum(page); // 페이지 번호 변경
  };

  // 민원 데이터를 API에서 가져오기
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // API 호출: 필터와 페이지 번호를 쿼리 매개변수로 사용
        const response = await axios.get(
          "https://localhost:8080/api/complain/list",
          {
            params: {
              state: processStatus || null, // 처리 상태 필터
              dept: complaintType || null, // 민원 유형 필터
              pageNum, // 현재 페이지 번호
            },
          }
        );
        setComplaints(response.data); // API 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("민원 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchComplaints();
  }, [pageNum, complaintType, processStatus]);

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
            <Select value={complaintType} onChange={handleComplaintTypeChange}>
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
          {currentData.map((complaint) => (
            <ContentsContainer key={complaint.cm_id}>
              <ContentTitle>{complaint.cm_title}</ContentTitle>
              <ContentDetails>{complaint.cm_dept}</ContentDetails>
              <ContentDetails>{complaint.cm_state}</ContentDetails>
              <ContentDetails>{complaint.user_name}</ContentDetails>
              <ContentDate>{complaint.cm_date}</ContentDate>
            </ContentsContainer>
          ))}
          {/* 위에거 api확인 안돼서 밑에 거로 확인하기 */}
          <ContentsContainer onClick={handleContentsClick}>
            <ContentTitle>2025 게시글 제목 1</ContentTitle>
            <ContentDetails>행정</ContentDetails>
            <ContentDetails>대기중</ContentDetails>
            <ContentDetails>황을선</ContentDetails>
            <ContentDate>2025.01.01</ContentDate>
          </ContentsContainer>
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
      {contentsBtnClicked && (
        <ComplaintsManagementContents
          SetContentsBtnClicked={SetContentsBtnClicked}
        />
      )}
    </>
  );
};

export default ComplaintsManagement;
