import axios from "axios";
import { useEffect, useState } from "react";
import CMcss from "./CMcss";

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
> = ({ SetContentsBtnClicked, complainId }) => {
  const [complainData, setComplaintData] = useState<ComplainData | null>(null);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [actionContent, setActionContent] = useState(""); // 조치 내용을 저장

  // 데이터 가져오기
  useEffect(() => {
    const fetchComplaintData = async () => {
      if (!complainId) {
        console.error("❌ complainId가 존재하지 않습니다.");
        return;
      }

      console.log(
        "📌 API 요청 URL:",
        `http://localhost:8080/api/complain/list/${complainId}`
      );

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

    const actionText =
      actionContent.trim() || complainData.complainAction || "조치 내용 없음";

    console.log("✅ 요청 데이터 확인:", {
      complainId: complainData.complainId,
      actionText, // ✅ params로 전달할 값
    });

    try {
      const response = await axios.post(
        `http://localhost:8080/api/complain/${complainData.complainId}/action`,
        null, // ✅ POST 요청이지만 body 없이 null 사용
        {
          params: { actionText }, // ✅ `@RequestParam` 방식으로 서버에 데이터 전달
        }
      );

      console.log("✅ 응답 데이터:", response.data);

      if (response.status === 200) {
        const newState = actionText !== "조치 내용 없음" ? "처리됨" : "대기중";

        setComplaintData((prev) =>
          prev
            ? { ...prev, complainState: newState, complainAction: actionText }
            : null
        );

        alert(`상태가 '${newState}'로 변경되었습니다.`);
        setDeleteClicked(false);
        setActionContent(""); // ✅ 제출 후 입력 필드 초기화
      }
    } catch (error) {
      console.error("❌ 상태 변경 중 오류 발생:");
      alert("상태 변경에 실패했습니다.");
    }
  };

  return (
    <>
      {complainData ? (
        <>
          <CMcss.Container>
            <CMcss.Header>
              <CMcss.TitleSection>
                <CMcss.Title>
                  {complainData.complainTitle || "제목 없음"}
                </CMcss.Title>
                <CMcss.Info>
                  담당자: {complainData.userName} | 민원인:{" "}
                  {/*{complainData.cm_email}*/}CCCCC.AAA |{" "}
                  {complainData.complainDate}
                </CMcss.Info>
              </CMcss.TitleSection>
              <CMcss.Status>
                {complainData.complainDept || "민원 유형 없음"} |{" "}
                {complainData.complainState || "상태 없음"}
              </CMcss.Status>
            </CMcss.Header>
            <CMcss.Content>
              {complainData.complainDescription || "내용이 없습니다."}
            </CMcss.Content>
          </CMcss.Container>
          <form onSubmit={toggleComplainState}>
            <CMcss.Container>
              <CMcss.ActionContainer>
                <CMcss.Title>조치내용</CMcss.Title>

                {complainData.complainAction ? (
                  // ✅ 조치 내용이 있을 경우 화면에 표시
                  <CMcss.ActionContent>
                    {complainData.complainAction}
                  </CMcss.ActionContent>
                ) : (
                  // ✅ 조치 내용이 없을 경우 입력 필드 표시 (대기중 상태일 때만)
                  complainData.complainState === "대기중" && (
                    <CMcss.TextArea
                      placeholder="내용을 입력해 주세요"
                      required
                      value={actionContent}
                      onChange={(e) => setActionContent(e.target.value)}
                    />
                  )
                )}
              </CMcss.ActionContainer>
            </CMcss.Container>
            <CMcss.ButtonGroup>
              <CMcss.Button onClick={() => SetContentsBtnClicked(false)}>
                목록
              </CMcss.Button>
              <CMcss.Button type="submit" state={complainData.complainState}>
                {complainData.complainState === "대기중"
                  ? "민원 처리하기"
                  : "상태 변경"}
              </CMcss.Button>
            </CMcss.ButtonGroup>
          </form>
        </>
      ) : (
        <>
          <CMcss.Content>데이터를 불러오는 중...</CMcss.Content>
        </>
      )}

      {deleteClicked && (
        <CMcss.Overlay>
          <CMcss.DeletePopUp>
            <div>
              조치 내용이 입력되지 않을 경우, 상태가 "대기중"으로 설정됩니다.
            </div>
            <CMcss.ButtonGroup>
              <CMcss.Button onClick={() => setDeleteClicked(false)}>
                취소
              </CMcss.Button>
              <CMcss.Button onClick={toggleComplainState}>확인</CMcss.Button>
            </CMcss.ButtonGroup>
          </CMcss.DeletePopUp>
        </CMcss.Overlay>
      )}
    </>
  );
};

export default ComplaintsManagementContents;
