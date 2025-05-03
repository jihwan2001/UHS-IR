import { useState } from "react";
import { StatsContents, StatsSideNavbar, StatsYearName } from "../../features";
import { SmallBanner } from "../../widgets";
import { Container, Contents, StatsLayoutWrapper } from "../styles";
import { PdfItem } from "../../features/stats/types";
import { universityData } from "../../features/stats/statsSideNavbar/universityData";

export const StatsYearbookPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedItem, setSelectedItem] = useState<PdfItem | null>(null);
  const groupedData = universityData.reduce((acc, curr) => {
    acc[curr.category] = curr.items;
    return acc;
  }, {} as Record<string, PdfItem[]>);
  return (
    <Container>
      <SmallBanner />
      <Contents>
        <StatsYearName
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <StatsLayoutWrapper>
          <StatsSideNavbar
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            groupedData={groupedData}
          />

          <StatsContents
            selectedItem={selectedItem}
            selectedYear={selectedYear}
          />
        </StatsLayoutWrapper>
      </Contents>
    </Container>
  );
};
