import { useState } from "react";
import { SearchBar, Pagination, AnnouncementTable } from "../../features";
import { Container, FilterContainer, Header } from "../reportList/styles";
import { Announcement } from "../../entities/announcement/model";
import { AnnouncementContent } from "./AnnouncementContent";

export const AnnouncementList = () => {
  const [contentsClick, setContentsClick] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Announcement | null>(
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
          <Pagination />
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
