import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ComplaintsManagementContents from "./ComplaintsManagementContents";
import CMcss from "./CMcss";

// ✅ 민원 데이터 구조 정의
interface Complaint {
  complainId: number;
  complainTitle: string;
  complainDept: string; // 부서 이름
  complainState: string; // 처리 상태 이름
  userName: string;
  complainDate: string;
}

// ✅ 전체 민원 목록 API 호출 (페이지네이션 적용)
const getList = async (pageNum: number) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/complain/list",
      {
        params: { pageNum },
      }
    );

    console.log(`📌 전체 목록 (pageNum: ${pageNum})`, response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 전체 목록 API 요청 실패:", error);
    return { content: [], totalPages: 1 }; // ✅ 오류 발생 시 기본값 반환
  }
};

// ✅ 필터링된 민원 목록 API 호출
const getFiltered = async (
  pageNum: number,
  deptId: number | null,
  stateId: number | null
) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/complain/filter",
      {
        params: {
          deptId: deptId !== null ? deptId : undefined, // ✅ 부서 ID (없으면 전체)
          stateId: stateId !== null ? stateId : undefined, // ✅ 상태 ID (없으면 전체)
          pageNum: pageNum, // ✅ 페이지 번호 유지
        },
      }
    );

    console.log(
      `📌 필터링된 목록 (deptId: ${deptId}, stateId: ${stateId}, pageNum: ${pageNum})`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("❌ 필터 API 요청 실패:", error);
    return { content: [], totalPages: 1 }; // ✅ 오류 발생 시 기본값 반환
  }
};

const ComplaintsManagement = () => {
  // ✅ 상태 관리
  const [complains, setComplaints] = useState<Complaint[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deptId, setDeptId] = useState<number | null>(null); // ✅ 부서 ID
  const [stateId, setStateId] = useState<number | null>(null); // ✅ 상태 ID
  const [contentsBtnClicked, setContentsBtnClicked] = useState(false);
  const [selectedComplainId, setSelectedComplainId] = useState<number | null>(
    null
  );

  // ✅ 민원 목록 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (deptId !== null || stateId !== null) {
          // ✅ 필터가 있는 경우
          data = await getFiltered(pageNum, deptId, stateId);
        } else {
          // ✅ 필터가 없는 경우
          data = await getList(pageNum);
        }

        console.log("📌 API에서 받은 데이터:", data);

        // ✅ API 응답 데이터 구조 확인
        if (Array.isArray(data)) {
          setComplaints(data); // ✅ 데이터가 배열이면 그대로 저장
          setTotalPages(1);
        } else if (data.content && Array.isArray(data.content)) {
          setComplaints(data.content); // ✅ 응답이 { content: [...], totalPages } 구조일 경우
          setTotalPages(data.totalPages || 1);
        } else if (Array.isArray(data.content)) {
          setComplaints(data.content);
          setTotalPages(data.totalPages || 1);
        } else {
          console.warn("⚠️ 예상치 못한 데이터 구조:", data);
          setComplaints([]); // ✅ 데이터가 올바르게 오지 않을 경우 빈 배열 설정
          setTotalPages(1);
        }
      } catch (error) {
        console.error("❌ 데이터 가져오기 실패:", error);
        setComplaints([]); // ❌ API 요청 실패 시 화면이 깨지지 않도록 빈 배열 설정
        setTotalPages(1);
      }
    };

    fetchData();
  }, [pageNum, deptId, stateId]);

  const handleContentsClick = (complainId: number) => {
    setSelectedComplainId(complainId);
    setContentsBtnClicked(true);
  };

  // ✅ 부서 ID 변환 (드롭다운)
  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue =
      e.target.value === "" ? null : parseInt(e.target.value, 10);
    setDeptId(selectedValue);
    setPageNum(1);
  };

  // ✅ 처리 상태 ID 변환 (드롭다운)
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue =
      e.target.value === "" ? null : parseInt(e.target.value, 10);
    setStateId(selectedValue);
    setPageNum(1);
  };

  return (
    <>
      {!contentsBtnClicked && (
        <>
          {/* 필터 섹션 */}
          <CMcss.CMHeader>
            <CMcss.Select value={deptId ?? ""} onChange={handleDeptChange}>
              <option value="0">민원유형</option>
              <option value="1">행정</option>
              <option value="2">시설</option>
              <option value="3">안전</option>
              <option value="4">교육</option>
              <option value="5">운영</option>
            </CMcss.Select>
            <CMcss.Select value={stateId ?? ""} onChange={handleStateChange}>
              <option value="0">처리상태</option>
              <option value="1">대기중</option>
              <option value="2">처리됨</option>
            </CMcss.Select>
          </CMcss.CMHeader>
          {/* 민원 목록 헤더 */}
          <CMcss.InfoContainer>
            <CMcss.InfoTitle>제목</CMcss.InfoTitle>
            <CMcss.InfoDetails>민원유형</CMcss.InfoDetails>
            <CMcss.InfoDetails>처리상태</CMcss.InfoDetails>
            <CMcss.InfoDetails>담당자</CMcss.InfoDetails>
            <CMcss.InfoDetails>일자</CMcss.InfoDetails>
          </CMcss.InfoContainer>
          {/* 민원 데이터 표시 */}
          {complains.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
              ❌ 불러온 데이터가 없습니다.
            </p>
          ) : (
            complains.map((complain) => (
              <CMcss.ContentsContainer
                key={complain.complainId}
                onClick={() => handleContentsClick(complain.complainId)}
              >
                <CMcss.ContentTitle>
                  {complain.complainTitle}
                </CMcss.ContentTitle>
                <CMcss.ContentDetails>
                  {complain.complainDept}
                </CMcss.ContentDetails>
                <CMcss.ContentDetails>
                  {complain.complainState}
                </CMcss.ContentDetails>
                <CMcss.ContentDetails>{complain.userName}</CMcss.ContentDetails>
                <CMcss.ContentDate>{complain.complainDate}</CMcss.ContentDate>
              </CMcss.ContentsContainer>
            ))
          )}

          {/* 페이지네이션 UI */}
          <CMcss.Pagination>
            <CMcss.PageButton
              disabled={pageNum === 1}
              onClick={() => setPageNum(pageNum - 1)}
            >
              &lt;
            </CMcss.PageButton>
            {Array.from({ length: totalPages }, (_, index) => (
              <CMcss.PageButton
                key={index + 1}
                $active={pageNum === index + 1}
                onClick={() => setPageNum(index + 1)}
              >
                {index + 1}
              </CMcss.PageButton>
            ))}
            <CMcss.PageButton
              disabled={pageNum === totalPages}
              onClick={() => setPageNum(pageNum + 1)}
            >
              &gt;
            </CMcss.PageButton>
          </CMcss.Pagination>
        </>
      )}
      {contentsBtnClicked && (
        <ComplaintsManagementContents
          SetContentsBtnClicked={setContentsBtnClicked}
          complainId={selectedComplainId}
        />
      )}
    </>
  );
};

export default ComplaintsManagement;
