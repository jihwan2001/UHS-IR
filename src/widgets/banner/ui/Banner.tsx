import { HeroContainer } from "../../styles";
import banner from "../../../img/banner.png";

export const Banner = () => {
  return (
    <HeroContainer background={banner}>
      <div>
        <h1>UHS IR</h1>
        <p>
          협성대학교 IR 센터는 대내‧외 중요 데이터들을 수집 · 분석 · 관리하여
        </p>
        <p>대학 운영에 중요한 의사결정을 내립니다.</p>
      </div>
    </HeroContainer>
  );
};
