import styled from "styled-components";
import dot from "../../img/dot.png";
import { useState } from "react";

// 스타일 정의
const BoxContainer = styled.div`
  position: relative;
`;

const DotMenu = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 5px; /* Box의 위쪽으로부터 5px */
  right: 5px; /* Box의 오른쪽으로부터 5px */
  border: 1px solid black;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  background-color: white;
`;

const ContextMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const MenuItem = styled.div`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #6c757d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #5a6268;
  }
  &:last-child {
    background-color: #ff8a8a;
    &:hover {
      background-color: #c46a6a;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const DeletePopUp = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 10px;
  width: 450px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 100;
  background-color: #fff;
`;

const Notice = styled.div`
  display: flex;
  justify-content: center;
`;

// 인터페이스 정의
interface ModifyItems {
  header: number; // 숫자 ID로 변경
  middle: string; // 중간 메뉴는 여전히 string
  renameItem: (headerId: number, name: string) => void; // 숫자와 문자열을 받도록 수정
  deleteItem: (headerId: number, name: string) => void; // 숫자와 문자열을 받도록 수정
}

const Dotpage = ({ header, middle, renameItem, deleteItem }: ModifyItems) => {
  const [isClicked, setIsClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  return (
    <BoxContainer>
      <DotMenu
        src={dot}
        alt="menu"
        onClick={(e) => {
          e.stopPropagation(); // 부모의 클릭 이벤트 방지
          setIsClicked(!isClicked);
        }}
      />
      {isClicked && (
        <ContextMenu>
          <MenuItem
            onClick={() => {
              renameItem(header, middle);
              setIsClicked(false); // 메뉴 닫기
            }}
          >
            이름 변경
          </MenuItem>
          <MenuItem
            onClick={() => {
              setDeleteClicked(true);
              setIsClicked(false); // 메뉴 닫기
            }}
          >
            삭제
          </MenuItem>
        </ContextMenu>
      )}
      {deleteClicked && (
        <>
          <Overlay />
          <DeletePopUp>
            <Notice>
              선택된 항목을 삭제하겠습니까?
              <br />
              ※헤더 메뉴 삭제시 중간메뉴까지 모두 삭제됩니다.
            </Notice>
            <ButtonGroup>
              <Button
                type="button"
                onClick={() => {
                  setDeleteClicked((prev) => !prev);
                }}
              >
                취소
              </Button>
              <Button
                type="button"
                onClick={() => {
                  deleteItem(header, middle);
                  setIsClicked(false); // 메뉴 닫기
                }}
              >
                삭제
              </Button>
            </ButtonGroup>
          </DeletePopUp>
        </>
      )}
    </BoxContainer>
  );
};

export default Dotpage;
