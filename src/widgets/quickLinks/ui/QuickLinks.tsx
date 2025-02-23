import rightArrow from "../../../img/rightArrow.png"; // ✅ 오른쪽 화살표 이미지 import
import {
  QuickLinksHeader,
  QuickLinksContainer,
  QuickLinkButton,
} from "../../styles";

export const QuickLinks = () => {
  return (
    <>
      <QuickLinksHeader>
        <h1>첫 방문이신가요?</h1>
        <p>바로가기를 사용해보세요.</p>
      </QuickLinksHeader>
      <QuickLinksContainer>
        <QuickLinkButton to={"/ir-overview"}>
          IR 센터 개요
          <img src={rightArrow} alt="Go" />
        </QuickLinkButton>
        <QuickLinkButton to={"/stats-yearbook"}>
          대학 통계 자료
          <img src={rightArrow} alt="Go" />
        </QuickLinkButton>
        <QuickLinkButton to={"/analysis-reports"}>
          분석 보고서
          <img src={rightArrow} alt="Go" />
        </QuickLinkButton>
        <QuickLinkButton to={"/announcement"}>
          공지사항
          <img src={rightArrow} alt="Go" />
        </QuickLinkButton>
      </QuickLinksContainer>
    </>
  );
};
