export interface PdfItem {
  baseName: string; // ex) 대학재정교육비_등록금회계
  groupName: string;
}

export interface PdfApiResponse extends PdfItem {
  year: string;
  fileUrl: string;
}
export interface YearProps {
  selectedYear: number;
}
export interface StatsYearProps extends YearProps {
  setSelectedYear: (year: number) => void;
}
export interface StatsSideNavbarProps {
  selectedItem: PdfItem | null;
  setSelectedItem: (item: PdfItem) => void;
  groupedData: Record<string, PdfItem[]>;
}
