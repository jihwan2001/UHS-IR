import { Select } from "../../shared/ui/Select";

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export const YearSelector = ({
  selectedYear,
  onYearChange,
}: YearSelectorProps) => {
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <Select
      value={selectedYear.toString()}
      onChange={(e) => onYearChange(parseInt(e.target.value))}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}학년도
        </option>
      ))}
    </Select>
  );
};
