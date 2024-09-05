import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { divMenus, IMenus } from "../atoms"; // IMenus 가져오기

// DotPosition 타입 정의
interface DotPosition {
  index: number;
  top: number;
  left: number;
  menuId: string; // 삭제할 메뉴의 ID를 전달받는 prop 추가
}

const MenuContainer = styled.div<{ top: number; left: number }>`
  position: absolute;
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 10px;
  z-index: 1000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 5px 0;

  &:hover {
    background-color: #e4e4e4; /* 호버 시 배경색 변경 */
  }
`;

interface DotPageProps {
  setExpandedDots: (value: DotPosition | null) => void; // 기존 타입 유지
  position: { top: number; left: number };
  menuId: string; // 삭제할 메뉴의 ID를 전달받는 prop 추가
}

function DotPage({ setExpandedDots, position, menuId }: DotPageProps) {
  const setMenus = useSetRecoilState(divMenus);

  const DeleteMenu = (id: string) => {
    setMenus((allMenus) => {
      const { [id]: removedMenus, ...updatedMenus } = allMenus;
      console.log(removedMenus);
      return updatedMenus as IMenus; // 타입 캐스팅하여 IMenus로 반환
    });
  };
  return (
    <MenuContainer top={position.top} left={position.left}>
      <MenuItem
        onClick={() => {
          setExpandedDots(null); // 메뉴를 닫기 위해 dots 상태를 null로 설정
        }}
      >
        이름 수정하기
      </MenuItem>
      <MenuItem
        onClick={() => {
          DeleteMenu(menuId); // 삭제할 메뉴의 ID를 전달받음
          setExpandedDots(null); // 메뉴를 닫기 위해 dots 상태를 null로 설정
        }}
      >
        삭제하기
      </MenuItem>
    </MenuContainer>
  );
}

export default DotPage;
