import styled from "styled-components";
import { Link } from "react-router-dom"; // ✅ Link 스타일링

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center; /* 이미지와 텍스트 수직 정렬 */
  cursor: pointer;
`;
interface LogoProps {
  fontSize?: string; // 선택적으로 fontSize를 받을 수 있도록 설정
  logoSize?: string;
}
export const LogoImage = styled.img<LogoProps>`
  width: ${(props) => props.logoSize || "2rem"};
  height: ${(props) => props.logoSize || "2rem"};
  margin-right: 8px; /* 이미지와 텍스트 간격 */
`;

export const LogoText = styled.p<LogoProps>`
  font-size: ${(props) => props.fontSize || "1.125rem"};
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
  width: 100%;
  max-width: 363px;
  aspect-ratio: 363 / 191; /* 비율 유지하면서 높이 자동 계산 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  border: 2px solid #0f2280;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
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

export const LineImg = styled.img<{ heightSize: number }>`
  width: 1px;
  height: ${(prop) => `${prop.heightSize}px`};
  margin: 0; // 좌우 간격
  display: block;
`;

// Form 관련
export const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;
export const BackButton = styled.div`
  background: #ccc;
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 1.125rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: #b3b3b3;
  }
`;

//  sortDropdown
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background: none;
  border: none;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  list-style: none;
  padding: 5px 0;
  width: 120px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.li`
  padding: 8px 10px;
  font-size: 1.125rem;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
`;
