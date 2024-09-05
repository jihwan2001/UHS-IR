import styled from "styled-components";
import banner from "../img/banner.png";
import symbolMark from "../img/symbolMark.png";

const MainBg = styled.div`
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  max-width: 100vw;
  min-height: 60vh;
  z-index: 1;
`;

const Boxes = styled.div`
  position: relative;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 가운데 정렬 */
  justify-content: center;
  gap: 30px; /* 요소 간의 간격 */
`;

const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  text-align: center;
  font-size: 18px;
  width: 227px;
  height: 210px;
  padding: 10px;
  background-color: white;
  z-index: 99;
  border-bottom-right-radius: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  gap: 10px; /* 요소 간의 간격을 설정 */
`;

const BoxRow = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1300px; /* 최대 너비 설정 */
  gap: 40px;
`;

const SymbolMark = styled.div`
  background-image: url(${symbolMark});
  background-size: cover;
  background-position: center;
  width: 226px;
  height: 210px;
  opacity: 0.5;
`;

const StandardYear = styled.p`
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  width: 100%;
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid black; /* 선의 색상과 두께를 설정 */
    margin: 0 10px; /* 글자와 선 사이의 간격을 설정 */
  }
`;

const Rates = styled.p`
  font-size: 17px;
`;

const Rate = styled.p`
  font-size: 35px;
  font-weight: bold;
  color: #0f2280;
`;

const Formula = styled.p`
  font-size: 12px;
  color: #8a8d8f;
`;

function MainScreen() {
  return (
    <>
      <MainBg />
      <Boxes>
        <BoxRow>
          <BoxContent>
            <StandardYear>2023년 기준</StandardYear>
            <Rates>신입생 총원율</Rates>
            <Rate>98.6</Rate>
            <Formula>(정원내 입학자 수/정원내 모집인원) * 100</Formula>
          </BoxContent>
          <BoxContent>
            <StandardYear>2023년 기준</StandardYear>
            <Rates>재학생 충원율</Rates>
            <Rate>98.7</Rate>
            <Formula>
              {`{정원내 재학생 수 / (학생정원 - 학생 모집정지 인원)} * 100`}
            </Formula>
          </BoxContent>
          <BoxContent>
            <StandardYear>2023년 기준</StandardYear>
            <Rates>취업률</Rates>
            <Rate>62.2</Rate>
            <Formula>취업자 수/(졸업자 수-제외자 수)* 100</Formula>
          </BoxContent>
          <BoxContent>
            <StandardYear>2023년 기준</StandardYear>
            <Rates>중도탈락률</Rates>
            <Rate>6.43</Rate>
            <Formula>(중도탈락학생 수 / 학부 재적학생) * 100</Formula>
          </BoxContent>
        </BoxRow>
        <BoxRow>
          <BoxContent>
            <StandardYear>2023년 기준</StandardYear>
            <Rates>교원 1인당 SCI급 논문 수</Rates>
            <Rate>0.0182</Rate>
            <Formula> SCI급,SCOPUS 학술지 수/전입 교원 수</Formula>
          </BoxContent>
          <BoxContent>
            <StandardYear>2023년 기준</StandardYear>
            <Rates>전임교원 1인당 학생 수</Rates>
            <Rate>28.86</Rate>
            <Formula>재학생 수 / 재학생 기준 전임 교원 수</Formula>
          </BoxContent>
          <BoxContent>
            <StandardYear>2023년 기준</StandardYear>
            <Rates>재학생 1인당 1학기 장학금</Rates>
            <Rate>2,079,017원</Rate>
            <Formula>{`{(장학금 총 금액/재학생 수) * 100}`} / 2</Formula>
          </BoxContent>
          <SymbolMark />
        </BoxRow>
      </Boxes>
    </>
  );
}

export default MainScreen;
