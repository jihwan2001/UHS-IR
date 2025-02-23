import { Container, Year } from "./styles";

export const StatsYearName = () => {
  // 현재 연도를 기준으로 최근 10년치 연도를 생성
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  return (
    <Container>
      <Year>
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
