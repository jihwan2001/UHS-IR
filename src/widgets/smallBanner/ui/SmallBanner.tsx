import banner from "../../../img/banner.png";
import { SmallDropDown } from "../../../shared/ui/SmallDropDown";
import {
  SmallContainer,
  BannerContent,
  BannerTitle,
  Breadcrumb,
} from "../../styles";
import { useBannerTitle } from "../../useBannerTitle";

export const SmallBanner = () => {
  const bannerTitle = useBannerTitle();

  return (
    <SmallContainer background={banner}>
      <BannerContent>
        <>
          <BannerTitle>{bannerTitle}</BannerTitle>
          <Breadcrumb>
            <span>Home</span> &nbsp; · &nbsp;
            {/* 드롭다운 메뉴들 */}
            <SmallDropDown />
          </Breadcrumb>
        </>
      </BannerContent>
    </SmallContainer>
  );
};
