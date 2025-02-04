import { useEffect, useRef, useState } from "react";
import axios from "axios";
import RMcss from "./RMcss";
import RMBackBtn from "./RMBackBtn";
import RMFolderModal from "./RMfolderModal";

interface Folder {
  dir_id: number;
  dir_name: string;
  dir_parent_id: number;
}

const today = new Date().toISOString().split("T")[0].replace(/-/g, ".");

const ReportManagement = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [parentDirId, setParentDirId] = useState<number>(0); // 현재 디렉터리 ID
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 폴더 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const endpoint =
          parentDirId === 0
            ? "http://localhost:8080/api/version/root" // 루트 폴더 API
            : "http://localhost:8080/api/version/folder"; // 하위 폴더 API

        const params =
          parentDirId === 0 ? { user_id: 1 } : { parentDir: parentDirId }; // 요청 파라미터
        const response = await axios.get(endpoint, { params });

        console.log("폴더 데이터 : ", response.data);
        setFolders(response.data || []);
      } catch (error) {
        console.error("폴더 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchFolders();
  }, [parentDirId]); // parentDirId가 변경될 때마다 실행

  // 폴더 생성 버튼 클릭 시 POST 요청
  const handleAddFolder = async (folderName: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/version/folders?userId=1",
        {
          dir_name: folderName,
          dir_parent_id: parentDirId,
          user_id: 1,
        }
      );

      // 폴더 목록 상태 업데이트
      alert("폴더 업로드 성공");
      setFolders((prev) => [...prev, response.data]);
    } catch (error) {
      alert("폴더 업로드 실패");

      console.error("폴더 생성 중 오류 발생:", error);
    }
  };

  // 파일 업로드 버튼 클릭 시 파일 선택기 열기
  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
    setDropdownOpen(false);
  };

  // 파일 업로드 로직
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("files", file);
      formData.append("userId", "1"); // 사용자 ID
      formData.append("dir_id", parentDirId.toString()); // 현재 디렉터리 ID
      formData.append(
        "dir_parent_id",
        parentDirId === 0 ? "" : parentDirId.toString()
      ); // 상위 디렉터리 ID

      try {
        const response = await axios.post(
          "http://localhost:8080/api/upload/dir",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("파일 업로드 성공!");
        console.log("업로드 결과:", response.data);

        // 파일 업로드 후 UI 업데이트 로직 추가 필요 시 여기에 작성
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "파일 업로드 실패!";
        alert(errorMessage);
        console.error("파일 업로드 중 오류 발생:", error);
      }
    }
  };

  return (
    <>
      {/* 폴더 생성 모달 */}
      <RMFolderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFolder}
      />
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      <RMcss.ButtonContainer>
        {/* 뒤로 가기 버튼 */}
        <RMBackBtn parentDirId={parentDirId} setParentDirId={setParentDirId} />

        <RMcss.ButtonGroup ref={dropdownRef}>
          <RMcss.ActionButton
            color="#28a745"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            + add
          </RMcss.ActionButton>

          {dropdownOpen && (
            <RMcss.DropdownMenu>
              <RMcss.DropdownItem onClick={() => setIsModalOpen(true)}>
                📁 폴더 생성
              </RMcss.DropdownItem>
              <RMcss.DropdownItem onClick={handleFileUploadClick}>
                📤 파일 업로드
              </RMcss.DropdownItem>
            </RMcss.DropdownMenu>
          )}
          <RMcss.ActionButton color="#dc3545">× delete</RMcss.ActionButton>
        </RMcss.ButtonGroup>
      </RMcss.ButtonContainer>

      <RMcss.InfoContainer>
        <RMcss.InfoTitle flexValue={1}>유형</RMcss.InfoTitle>
        <RMcss.InfoDetails flexValue={3}>제목</RMcss.InfoDetails>
        <RMcss.InfoDate flexValue={1}>업로드 일자</RMcss.InfoDate>
      </RMcss.InfoContainer>

      {/* 폴더 리스트 출력 */}
      {folders.map((folder) => (
        <RMcss.ContentsContainer key={folder.dir_id}>
          <RMcss.ContentTitle flexValue={1}>📁</RMcss.ContentTitle>
          <RMcss.ContentDetails
            flexValue={3}
            onClick={() => setParentDirId(folder.dir_id)} // 클릭 시 하위 폴더로 이동
          >
            {folder.dir_name}
          </RMcss.ContentDetails>
          <RMcss.ContentDate flexValue={1}>{today}</RMcss.ContentDate>
        </RMcss.ContentsContainer>
      ))}
    </>
  );
};

export default ReportManagement;
