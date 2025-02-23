import styled from "styled-components";
import { Link } from "react-router-dom"; // ✅ Link 스타일링

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center; /* 이미지와 텍스트 수직 정렬 */
  cursor: pointer;
`;

export const LogoImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px; /* 이미지와 텍스트 간격 */
`;

export const LogoText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #0f2280;
  margin: 0;
`;

// 버튼 스타일 정의
export const StyledButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
export const StatisticsHeader = styled.div`
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
export const StatisticsContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 25px;
  padding: 20px 0;
`;

export const CardContainer = styled.div`
  width: 363px;
  height: 191px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  border: 2px solid #0f2280;
  border-radius: 5px;
  padding: 0 20px;
`;

export const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #0f2280;
  margin-bottom: 10px;
`;

export const Value = styled.p`
  font-size: 48px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

export const SecValue = styled.p`
  color: #666666;
  font-size: 18px;
`;

// 드롭다운 css

export const DropDownContainer = styled.span`
  position: relative;
  display: inline-block;
`;

export const DropDownButton = styled.p`
  cursor: pointer;
  font-size: 24px;
  font-weight: 300;
  color: white;

  &:hover {
    color: #0f2280;
    span {
      text-decoration: none;
      color: white;
    }
  }
`;

export const DropDownMenu = styled.p`
  position: absolute;
  left: 0;
  top: 120%;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 10;
`;

export const DropDownItem = styled(Link)<{ $disabled?: boolean }>`
  display: block;
  padding: 12px 16px;
  color: ${({ $disabled }) =>
    $disabled ? "#0F2280" : "black"}; // 비활성화된 경우 회색
  text-decoration: none;
  font-size: 18px;
  pointer-events: ${({ $disabled }) =>
    $disabled ? "none" : "auto"}; // 클릭 방지
  cursor: ${({ $disabled }) =>
    $disabled ? "default" : "pointer"}; // 비활성화 시 기본 커서

  &:hover {
    background-color: ${({ $disabled }) =>
      $disabled ? "transparent" : "#f1f1f1"}; // 비활성화 시 hover 효과 제거
    color: ${({ $disabled }) => ($disabled ? "#ccc" : "#0f2280")};
    font-weight: ${({ $disabled }) => ($disabled ? "normal" : "bold")};
  }
`;
