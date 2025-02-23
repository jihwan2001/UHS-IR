import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 1920px;
  height: 80px;
  backdrop-filter: blur(5px);
  background: rgb(255 255 255 / 0.7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 180px;
  z-index: 1000;
`;

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px; /* 메뉴 간격을 더 넓게 조정 */
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  position: relative;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 6px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0f2280;
  }
`;

/* ✅ HeroContainer에서 background를 props로 받아 처리 */
interface HeroProps {
  background: string;
}

export const HeroContainer = styled.section<HeroProps>`
  background: ${({ background }) =>
    `url(${background}) center/cover no-repeat`};
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: left;
  color: white;
  div {
    padding: 0 180px;
  }
  h1 {
    font-size: 64px;
    font-weight: bold;
    margin-bottom: 25px;
  }
  p {
    font-size: 24px;
  }
`;

export const QuickLinksHeader = styled.div`
  h1 {
    font-size: 36px;
    font-weight: bold;
    margin: 30px 0;
  }
  p {
    font-size: 24px;
    margin: 20px 0;
  }
`;

export const QuickLinksContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 25px;
  padding: 20px 0;
`;

// ✅ 기존 버튼을 확장하여 새로운 스타일 적용
export const QuickLinkButton = styled(Link)`
  width: 363px; /* 버튼 너비 */
  height: 77px; /* 버튼 높이 */
  display: flex;
  align-items: center;
  justify-content: space-between; /* 글씨와 아이콘을 양쪽 정렬 */
  padding: 0 20px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
  background-color: #f7f9fc;
  box-shadow: 0px 4px 4px 0px #000000;
  color: #333333;
  border: 1px solid black;
  transition: all 0.3s ease-in-out;

  &:hover {
    border: 2px solid #0f2280;
    color: #0f2280;
    transform: translateY(-5px); /* 화살표가 위로 움직이는 효과 */
  }

  img {
    width: 32px;
    height: 32px;
    transition: transform 0.3s ease-in-out;
  }
`;

export const SmallContainer = styled(HeroContainer)`
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center; /* ✅ 중앙 정렬 */
  position: relative;
`;

export const BannerContent = styled.div`
  width: 100%;
  /* max-width: 1200px; */
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
`;

export const BannerTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: white;
  margin-top: 5px;
  white-space: nowrap; /* ✅ 텍스트 줄바꿈 방지 */
  overflow: hidden;
`;

export const Breadcrumb = styled.p`
  font-size: 16px;
  color: white;
  margin-bottom: 5px;
`;
