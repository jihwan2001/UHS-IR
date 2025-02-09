import styled from "styled-components";

// UI 스타일을 정의하는 컴포넌트
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const InfoContainer = styled.div`
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  padding: 15px;
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const InfoTitle = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 4};
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const InfoDetails = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 1};
  /* text-align: center; */
  font-size: 18px;
  font-weight: bold;
`;

const InfoDate = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 1};
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const ContentsContainer = styled.div`
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ContentTitle = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 4};
  font-size: 16px;
`;

const ContentDetails = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 1};
  /* text-align: center; */
  font-size: 14px;
`;

const ContentDate = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 1};
  text-align: center;
  font-size: 14px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 5px 10px;
  border: none;
  background-color: ${({ active }) => (active ? "#007bff" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#007bff")};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
  &:disabled {
    background-color: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ActionButton = styled.button<{ color: string }>`
  padding: 8px 16px;
  background-color: ${({ color }) => color};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  width: 150px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f8f9fa;
  }
`;
const UploadedFile = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 반투명 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* 항상 위에 표시 */
`;

const Modal = styled.div`
  background-color: white;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const FolderButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const FolderButton = styled.button<{ color: string }>`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${(props) => props.color};
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.color === "#28a745" ? "#218838" : "#c82333"};
  }
`;

// ActionButton의 커스텀 속성을 정의하는 TypeScript 인터페이스
interface ActionButtonProps {
  color?: string;
  hoverColor?: string;
}

// 버튼 컨테이너 스타일
const PdfButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 20px 0;
`;

const PdfActionButtons = styled.div`
  display: flex;
  gap: 10px;
  /* justify-content: space-evenly; */
`;

// 개별 버튼 스타일
const PdfActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background-color: ${({ color }) => color || "#007bff"};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#0056b3"};
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

const FileContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  width: 100%;
  font-family: Arial, sans-serif;
`;

const FileTitle = styled.h3`
  margin: 0 10px 20px;
  font-size: 20px;
  color: #333;
`;

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #666;
`;

const Icon = styled.span`
  color: #333;
`;

export default {
  Header,
  Select,
  InfoContainer,
  InfoTitle,
  InfoDetails,
  InfoDate,
  ContentsContainer,
  ContentTitle,
  ContentDetails,
  ContentDate,
  Pagination,
  PageButton,
  ButtonContainer,
  BackButton,
  ActionButton,
  ButtonGroup,
  DropdownMenu,
  DropdownItem,
  UploadedFile,
  Overlay,
  ModalOverlay,
  Modal,
  ModalTitle,
  Input,
  FolderButtonContainer,
  FolderButton,
  PdfButtonContainer,
  PdfActionButtons,
  PdfActionButton,
  FileContainer,
  FileTitle,
  FileDetails,
  DetailItem,
  Icon,
};
