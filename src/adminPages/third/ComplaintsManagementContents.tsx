import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

// UI 스타일 정의
const Container = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
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
  gap: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #333;
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
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const ActionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
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
interface ComplaintData {
  cm_id: number;
  cm_title: string;
  cm_dept: string;
  cm_state: string;
  user_name: string;
  cm_email: string;
  cm_date: string;
  cm_action: string | null;
  cm_description: string;
}

interface ComplaintsManagementContentsProps {
  SetContentsBtnClicked: (value: boolean) => void; // 부모로 상태 변경을 알리는 함수
}

const ComplaintsManagementContents: React.FC<
  ComplaintsManagementContentsProps
> = ({ SetContentsBtnClicked }) => {
  const [complaintData, setComplaintData] = useState<ComplaintData | null>(
    null
  );
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [actionContent, setActionContent] = useState(""); // 조치 내용을 저장

  // 데이터 가져오기
  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await axios.get<ComplaintData>(
          `https://localhost:8080/api/complain/list/${complaintData?.cm_id}`, // 1은 예시 cm_id
          { params: { user_id: 1 } } // 예시 사용자 ID
        );
        setComplaintData(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchComplaintData();
  }, []);

  // 처리 상태 변환 로직
  const toggleComplainState = async () => {
    if (!complaintData) return;

    try {
      const response = await axios.post(
        `https://localhost:8080/api/complain/list/${complaintData.cm_id}`,
        {
          cm_id: complaintData.cm_id,
          cm_action: actionContent || complaintData.cm_action,
          user_id: 1, // 예시 사용자 ID
        }
      );

      if (response.status === 200) {
        const newState =
          (actionContent || complaintData.cm_action)?.trim() !== ""
            ? "처리중"
            : "대기중";
        setComplaintData((prev) =>
          prev ? { ...prev, cm_state: newState } : null
        );
        alert(`상태가 '${newState}'로 변경되었습니다.`);
        setDeleteClicked(false);
      }
    } catch (error) {
      console.error("상태 변경 중 오류 발생:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  return (
    <>
      {complaintData ? (
        <Container>
          <Header>
            <TitleSection>
              <Title>{complaintData.cm_title || "제목 없음"}</Title>
              <Info>
                담당자: {complaintData.user_name} | 민원인:{" "}
                {complaintData.cm_email} | {complaintData.cm_date}
              </Info>
            </TitleSection>
            <Status>
              {complaintData.cm_dept || "민원 유형 없음"} |{" "}
              {complaintData.cm_state || "상태 없음"}
            </Status>
          </Header>
          <Content>
            {complaintData.cm_description || "내용이 없습니다."}
          </Content>
          <ActionContainer>
            {complaintData.cm_state === "대기중" && (
              <>
                <Title>조치내용</Title>
                <TextArea
                  placeholder="내용을 입력해 주세요"
                  required
                  value={actionContent}
                  onChange={(e) => setActionContent(e.target.value)}
                />
              </>
            )}
            <ActionTitle>현재 상태</ActionTitle>
            <ActionContent>
              {complaintData?.cm_action || "아직 조치되지 않은 상태입니다."}
            </ActionContent>
          </ActionContainer>
          <ButtonGroup>
            <Button onClick={() => SetContentsBtnClicked(false)}>목록</Button>
            <Button
              onClick={toggleComplainState}
              state={complaintData.cm_state}
            >
              {complaintData.cm_state === "대기중"
                ? "민원 처리하기"
                : "상태 변경"}
            </Button>
          </ButtonGroup>
        </Container>
      ) : (
        <Container>
          <Content>데이터를 불러오는 중...</Content>
        </Container>
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
