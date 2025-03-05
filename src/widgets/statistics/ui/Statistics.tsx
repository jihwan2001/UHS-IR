import { Card } from "../../../shared";
import { StatisticsContainer, StatisticsHeader } from "../../../shared/styles";

export const Statistics = () => {
  return (
    <>
      <StatisticsHeader>
        <h1>주요 지표 현황</h1>
        <p>2024년도 기준</p>
      </StatisticsHeader>
      <StatisticsContainer>
        <Card
          title="신입생 충원율"
          value="98.6%"
          secValue="( 정원내 입학자 수/정원내 모집인원 ) * 100"
        />
        <Card
          title="전임 교원 1인당 학생 수"
          value="28.86명"
          secValue="재학생 수 / 재학생 기준 전임 교원 수"
        />
        <Card
          title="취업률"
          value="62.2%"
          secValue="취업자 수 / ( 졸업자 수 - 제외자 수 ) * 100"
        />
        <Card
          title="재학생 1인당 1학기 장학금"
          value="2,079,017원"
          secValue="{ ( 장학금 총 금액 / 재학생 수 ) * 100 } / 2"
        />
      </StatisticsContainer>
    </>
  );
};
