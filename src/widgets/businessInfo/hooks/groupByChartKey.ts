// groupByChartKey.ts
export interface ChartItem {
  chartKey: string;
  year: string;
  value: number;
  unit?: string;
}

export type ChartGrouped = Record<
  string,
  { unit?: string; year: string; value: number }[]
>;

export const groupByChartKey = (data: ChartItem[]): ChartGrouped => {
  return data.reduce((acc: ChartGrouped, item) => {
    if (!acc[item.chartKey]) {
      acc[item.chartKey] = [];
    }
    acc[item.chartKey].push({
      year: item.year + "년", // 혹시 포맷 통일하려면
      value: item.value,
    });
    return acc;
  }, {});
};
