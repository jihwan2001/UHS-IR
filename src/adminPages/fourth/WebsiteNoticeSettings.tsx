import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Dotpage from "./Dotpage";

// 데이터 타입 정의
interface SiteData {
  header_id: number;
  header_name: string;
  middle_id: number;
  middle_name: string;
  data_file_id: number;
  data_file_name: string;
}

// 스타일 정의
const Container = styled.div`
  margin-bottom: 20px;
`;

const Menus = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Boxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const BoxContainer = styled.div`
  position: relative;
`;

const Box = styled.div<{ selected: boolean }>`
  border: ${(props) =>
    props.selected ? "2px solid black" : "1px solid black"};
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "white")};
  &:hover {
    background-color: #e0e0e0;
  }
`;

const AddButton = styled.div`
  border: 1px solid #00aa00;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 18px;
  color: #00aa00;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileUploadContainer = styled.div`
  margin-top: 10px;
`;

const FileInput = styled.input`
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-top: 50px;
  transition: background-color 0.3s;
  background-color: #333;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const WebsiteNoticeSettings: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData[]>([]);
  const [selectedHeaderId, setSelectedHeaderId] = useState<number | null>(null);
  const [selectedMiddleId, setSelectedMiddleId] = useState<number | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: string }>(
    {}
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // 데이터 가져오기
  useEffect(() => {
    axios
      .get("https://localhost:8080/api/site/list")
      .then((response) => {
        setSiteData(response.data);
        if (response.data.length > 0) {
          setSelectedHeaderId(response.data[0].header_id);
          setSelectedMiddleId(response.data[0].middle_id);
        }
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  }, []);

  // 서버로 데이터 업데이트
  const updateDataOnServer = (updatedData: SiteData) => {
    axios
      .post("https://localhost:8080/api/site/upda", updatedData)
      .then((response) => {
        console.log("데이터가 성공적으로 업데이트되었습니다:", response.data);
      })
      .catch((error) => {
        console.error("데이터 업데이트 중 오류 발생:", error);
      });
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    dataFileId: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith(".xlsx")) {
        setUploadedFiles({
          ...uploadedFiles,
          [dataFileId]: file.name,
        });
      } else {
        alert("xlsx 파일만 업로드할 수 있습니다.");
      }
    }
  };

  // 헤더 추가
  const addHeader = () => {
    const newHeaderName = prompt("새로운 헤더 이름을 입력하세요:");
    if (newHeaderName) {
      const newHeaderId =
        Math.max(...siteData.map((item) => item.header_id), 0) + 1;
      const newHeader = {
        header_id: newHeaderId,
        header_name: newHeaderName,
        middle_id: 0,
        middle_name: "",
        data_file_id: 0,
        data_file_name: "",
      };
      setSiteData([...siteData, newHeader]);
      updateDataOnServer(newHeader);
    }
  };

  // 헤더 이름 변경
  const renameHeader = (headerId: number) => {
    const newHeaderName = prompt("헤더 이름을 변경하세요:");
    if (newHeaderName) {
      const updatedSiteData = siteData.map((item) =>
        item.header_id === headerId
          ? { ...item, header_name: newHeaderName }
          : item
      );
      setSiteData(updatedSiteData);
      const updatedHeader = updatedSiteData.find(
        (item) => item.header_id === headerId
      );
      if (updatedHeader) updateDataOnServer(updatedHeader);
    }
  };

  // 헤더 삭제
  const deleteHeader = (headerId: number) => {
    const updatedSiteData = siteData.filter(
      (item) => item.header_id !== headerId
    );
    setSiteData(updatedSiteData);
    setSelectedHeaderId(null);
    setSelectedMiddleId(null);
    // 서버로 삭제 요청
    updateDataOnServer({
      header_id: headerId,
      header_name: "",
      middle_id: 0,
      middle_name: "",
      data_file_id: 0,
      data_file_name: "",
    });
  };

  // 중간 메뉴 추가
  const addMiddle = (headerId: number) => {
    const newMiddleName = prompt("새로운 중간 메뉴 이름을 입력하세요:");
    if (newMiddleName) {
      const newMiddleId =
        Math.max(...siteData.map((item) => item.middle_id), 0) + 1;
      const newMiddle = {
        header_id: headerId,
        header_name:
          siteData.find((item) => item.header_id === headerId)?.header_name ||
          "",
        middle_id: newMiddleId,
        middle_name: newMiddleName,
        data_file_id: 0,
        data_file_name: "",
      };
      setSiteData([...siteData, newMiddle]);
      updateDataOnServer(newMiddle);
    }
  };

  // 중간 메뉴 이름 변경
  const renameItem = (middleId: number) => {
    const newMiddleName = prompt("중간 메뉴 이름을 변경하세요:");
    if (newMiddleName) {
      const updatedSiteData = siteData.map((item) =>
        item.middle_id === middleId
          ? { ...item, middle_name: newMiddleName }
          : item
      );
      setSiteData(updatedSiteData);
      const updatedMiddle = updatedSiteData.find(
        (item) => item.middle_id === middleId
      );
      if (updatedMiddle) updateDataOnServer(updatedMiddle);
    }
  };

  // 중간 메뉴 삭제
  const deleteMiddle = (middleId: number) => {
    const updatedSiteData = siteData.filter(
      (item) => item.middle_id !== middleId
    );
    setSiteData(updatedSiteData);
    setSelectedMiddleId(null);
    // 서버로 삭제 요청
    updateDataOnServer({
      header_id: 0,
      header_name: "",
      middle_id: middleId,
      middle_name: "",
      data_file_id: 0,
      data_file_name: "",
    });
  };

  const headers = Array.from(
    new Set(
      siteData.map((item) => ({
        header_id: item.header_id,
        header_name: item.header_name,
      }))
    )
  );

  const middleMenus = siteData.filter(
    (item) => item.header_id === selectedHeaderId
  );

  const selectedFile = siteData.find(
    (item) => item.middle_id === selectedMiddleId
  );

  return (
    <>
      <Container>
        <Menus>헤더 메뉴</Menus>
        <Boxes>
          {headers.map((header) => (
            <BoxContainer key={header.header_id}>
              <Box
                onClick={() => {
                  setSelectedHeaderId(header.header_id);
                  setSelectedMiddleId(null);
                }}
                selected={header.header_id === selectedHeaderId}
              >
                {header.header_name}
              </Box>
              {isEditMode && (
                <Dotpage
                  header={header.header_id}
                  middle=""
                  renameItem={renameHeader}
                  deleteItem={deleteHeader}
                />
              )}
            </BoxContainer>
          ))}
          {isEditMode && <AddButton onClick={addHeader}>+</AddButton>}
        </Boxes>
      </Container>

      {selectedHeaderId && (
        <Container>
          <Menus>중간 메뉴</Menus>
          <Boxes>
            {middleMenus.map((menu) => (
              <BoxContainer key={menu.middle_id}>
                <Box
                  onClick={() => setSelectedMiddleId(menu.middle_id)}
                  selected={menu.middle_id === selectedMiddleId}
                >
                  {menu.middle_name}
                </Box>
                {isEditMode && (
                  <Dotpage
                    header={menu.header_id}
                    middle={menu.middle_name}
                    renameItem={() => renameItem(menu.middle_id)}
                    deleteItem={() => deleteMiddle(menu.middle_id)}
                  />
                )}
              </BoxContainer>
            ))}
            {isEditMode && (
              <AddButton onClick={() => addMiddle(selectedHeaderId)}>
                +
              </AddButton>
            )}
          </Boxes>
        </Container>
      )}

      {selectedMiddleId && selectedFile && (
        <Container>
          <Menus>표시 데이터</Menus>
          <Boxes>
            <Box selected={true}>{selectedFile.data_file_name}</Box>
          </Boxes>
          <FileUploadContainer>
            <label>
              {uploadedFiles[selectedFile.data_file_id]
                ? `업로드된 파일: ${uploadedFiles[selectedFile.data_file_id]}`
                : "xlsx 파일 업로드"}
              <FileInput
                type="file"
                accept=".xlsx"
                onChange={(e) => handleFileUpload(e, selectedFile.data_file_id)}
              />
            </label>
          </FileUploadContainer>
        </Container>
      )}

      <Button onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? "완료" : "수정하기"}
      </Button>
    </>
  );
};

export default WebsiteNoticeSettings;
