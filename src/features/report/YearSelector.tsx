import { useState } from "react";
import { Select } from "../../shared/ui/Select";

export const YearSelector = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  return (
    <Select
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}학년도
        </option>
      ))}
    </Select>
  );
};
