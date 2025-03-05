import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 20rem;
  border-right: 1px solid #ddd;
  /* padding: 30px; */
  background-color: white;
`;

export const SidebarTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const Folder = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  font-weight: 600;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  &:hover {
    color: #0f2280;
  }
`;

export const SidebarContents = styled.div`
  padding: 0 30px;
`;

export const FilesContainer = styled.div`
  padding-left: 2.25rem;
`;

export const FileItem = styled.div<{ isActive?: boolean }>`
  cursor: pointer;
  padding: 5px 0;
  color: ${({ isActive }) => (isActive ? "#0f2280" : "#333333")};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};

  &:hover {
    color: #0f2280;
  }
`;

export const LogoFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  padding: 0;
`;
