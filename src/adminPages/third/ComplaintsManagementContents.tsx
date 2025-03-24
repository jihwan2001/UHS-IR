import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

// UI 스타일 정의
const Container = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #333;
  margin-bottom: 20px;
`;

const Info = styled.div`
  font-size: 14px;
  color: #666;
`;

const Status = styled.div`
  font-size: 14px;
  color: #007bff;
  text-align: right;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
  margin: 10px 0;
`;

const ActionContainer = styled.div`
  border-radius: 8px;
`;

const ActionContent = styled.div`
  font-size: 16px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button<{ state?: string }>`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: ${({ state }) =>
    state === "대기중" ? "#007bff" : "#6c757d"};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ state }) =>
      state === "대기중" ? "#0056b3" : "#5a6268"};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 10px;
  resize: none;
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

// 민원 데이터 타입 정의
interface ComplainData {
  complainId: number;
  complainTitle: string;
  complainDept: string;
  complainState: string;
  userName: string;
  //ComplainEmail: string;
  complainDate: string;
  complainAction: string | null;
  complainDescription: string;
}

interface ComplaintsManagementContentsProps {
  SetContentsBtnClicked: (value: boolean) => void; // 부모로 상태 변경을 알리는 함수
  complainId: number | null;

}

const ComplaintsManagementContents: React.FC<
  ComplaintsManagementContentsProps
> = ({ SetContentsBtnClicked,complainId }) => {
  const [complainData, setComplaintData] = useState<ComplainData | null>(
    null
  );
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [actionContent, setActionContent] = useState(""); // 조치 내용을 저장


  // 데이터 가져오기
  useEffect(() => {
    const fetchComplaintData = async () => {
      if (!complainId) {
        console.error("❌ complainId가 존재하지 않습니다.");
        return;
      }

      console.log("📌 API 요청 URL:", `http://localhost:8080/api/complain/list/${complainId}`);

      try {
        const response = await axios.get<ComplainData>(
          `http://localhost:8080/api/complain/list/${complainId}`
        );

        console.log("✅ 민원 데이터 불러오기 성공:", response.data);
        setComplaintData(response.data);
      } catch (error) {
        console.error("❌ 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchComplaintData();
  }, [complainId]); // ✅ complainId가 변경될 때마다 실행
  

  // 처리 상태 변환 로직
  const toggleComplainState = async (event: React.FormEvent) => {
    event.preventDefault(); // ✅ 폼 기본 동작 방지 (페이지 새로고침 방지)
  
    if (!complainData) {
      console.error("❌ complainData가 존재하지 않습니다.");
      return;
    }
  
    // ✅ 현재 상태 확인 후 반대 상태로 변경
    const newState =
      complainData.complainState === "대기중" ? "처리됨" : "대기중";
  
    // ✅ "처리됨"이면 actionText 유지, "대기중"이면 초기화
    const actionText =
      newState === "처리됨"
        ? actionContent.trim() || complainData.complainAction || "조치 내용 없음"
        : "";
  
    console.log("✅ 요청 데이터 확인:", {
      complainId: complainData.complainId,
      actionText,
    });
  
    try {
      // ✅ FormData 생성 (application/x-www-form-urlencoded 형식)
      const formData = new URLSearchParams();
      formData.append("actionText", actionText);
  
      const response = await axios.post(
        `http://localhost:8080/api/complain/${complainData.complainId}/action`,
        formData, // ✅ FormData 사용
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
  
      console.log("✅ 응답 데이터:", response.data);
  
      if (response.status === 200) {
        // ✅ 상태 업데이트
        setComplaintData((prev) =>
          prev
            ? {
                ...prev,
                complainState: newState, // ✅ 변경된 상태 적용
                complainAction: actionText, // ✅ 조치 내용 반영
              }
            : null
        );
  
        alert(`상태가 '${newState}'로 변경되었습니다.`);
        setDeleteClicked(false);
        setActionContent(""); // ✅ 제출 후 입력 필드 초기화
      window.location.reload();
      }
    } catch (error) {
      console.error("❌ 상태 변경 중 오류 발생:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  

  return (
    <>
      {complainData ? (
        <>
          <Container>
            <Header>
              <TitleSection>
                <Title>{complainData.complainTitle || "제목 없음"}</Title>
                <Info>
                  담당자: {complainData.userName} | 민원인:{" "}
                  {/*{complainData.cm_email}*/}CCCCC.AAA |{" "}
                  {complainData.complainDate}
                </Info>
              </TitleSection>
              <Status>
                {complainData.complainDept || "민원 유형 없음"} |{" "}
                {complainData.complainState || "상태 없음"}
              </Status>
            </Header>
            <Content>
              {complainData.complainDescription || "내용이 없습니다."}
            </Content>
          </Container>
          <form onSubmit={toggleComplainState}>
          <Container>
          <ActionContainer>
  <Title>조치내용</Title>

  {complainData.complainAction ? (
    // ✅ 조치 내용이 있을 경우 화면에 표시
    <ActionContent>{complainData.complainAction}</ActionContent>
  ) : (
    // ✅ 조치 내용이 없을 경우 입력 필드 표시 (대기중 상태일 때만)
    complainData.complainState === "대기중" && (
      <TextArea
        placeholder="내용을 입력해 주세요"
        required
        value={actionContent}
        onChange={(e) => setActionContent(e.target.value)}
      />
    )
  )}
</ActionContainer>

          </Container>
          <ButtonGroup>
            <Button onClick={() => SetContentsBtnClicked(false)}>목록</Button>
            <Button
              type="submit"
              state={complainData.complainState}
            >
              {complainData.complainState === "대기중"
                ? "민원 처리하기"
                : "상태 변경"}
            </Button>
          </ButtonGroup>
          </form>
        </>
      ) : (
        <>
          <Content>데이터를 불러오는 중...</Content>
        </>
      )}

      {deleteClicked && (
        <Overlay>
          <DeletePopUp>
            <div>
              조치 내용이 입력되지 않을 경우, 상태가 "대기중"으로 설정됩니다.
            </div>
            <ButtonGroup>
              <Button onClick={() => setDeleteClicked(false)}>취소</Button>
              <Button onClick={toggleComplainState}>확인</Button>
            </ButtonGroup>
          </DeletePopUp>
        </Overlay>
      )}
    </>
  );
};

export default ComplaintsManagementContents;