import { useState } from "react";
import { SearchBar, AnnouncementTable } from "../../features";
import { Container, FilterContainer, Header } from "../reportList/styles";
import { AnnouncementContent } from "./AnnouncementContent";
import { BoardDataProps } from "../../features/announcement/types";

export const AnnouncementList = () => {
  const [contentsClick, setContentsClick] = useState(false);
  const [selectedReport, setSelectedReport] = useState<BoardDataProps | null>(
    null
  );
  //공지사항 클릭시 보이는 페이지
  return (
    <Container>
      <Header>공지사항</Header>
      {!contentsClick && (
        <>
          <FilterContainer>
            <SearchBar />
          </FilterContainer>
          <AnnouncementTable
            setContentsClick={setContentsClick}
            setSelectedReport={setSelectedReport}
          />
        </>
      )}
      {contentsClick && selectedReport && (
        <AnnouncementContent
          setContentsClick={setContentsClick}
          report={selectedReport}
        />
      )}
    </Container>
  );
};
