// StatsYearName.tsx
import { StatsYearProps } from "../types";
import { Container, Year } from "./styles";

export const StatsYearName = ({
  selectedYear,
  setSelectedYear,
}: StatsYearProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  return (
    <Container>
      <Year
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Year>
      <div>대학 통계 연보</div>
    </Container>
  );
};
