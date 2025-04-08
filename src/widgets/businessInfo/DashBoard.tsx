import { FinanceGroup } from "../../entities/businessInfo/FinanceGroup";
import { StudentPerformanceGroup } from "../../entities/businessInfo/StudentPerformanceGroup";
import { EducationCapabilityGroup } from "../../entities/businessInfo/EducationCapabilityGroup";

// const data1 = [
//   { year: "2022년", value: 6.3 },
//   { year: "2023년", value: 7.5 },
//   { year: "2024년", value: 7.6 },
// ];

// const data2 = [
//   { year: "2022년", value: 64.7 },
//   { year: "2023년", value: 62.2 },
//   { year: "2024년", value: 61.8 },
// ];

export const DashBoard = () => {
  return (
    <>
      <FinanceGroup />
      <StudentPerformanceGroup />
      <EducationCapabilityGroup />
    </>
  );
};

// export const DashBoard = () => {
//   return (
//     <>
//       {aiNavs.map((nav, i) => (
//         <>
//           <GroupNameBox key={i}>{nav}</GroupNameBox>
//           <DashboardWrapper>
//             <BusinessChartBox
//               title="신입생 경쟁률"
//               data={data1}
//               stroke="#28a745"
//               fill="#28a745"
//               dot={CustomDot}
//             />
//             <BusinessChartBox
//               title="취업률"
//               data={data2}
//               stroke="#dc3545"
//               fill="#dc3545"
//               dot={CustomDotRed}
//             />
//             <BusinessChartBox
//               title="취업률"
//               data={data2}
//               stroke="#dc3545"
//               fill="#dc3545"
//               dot={CustomDotRed}
//             />{" "}
//             <BusinessChartBox
//               title="취업률"
//               data={data2}
//               stroke="#dc3545"
//               fill="#dc3545"
//               dot={CustomDotRed}
//             />
//           </DashboardWrapper>
//         </>
//       ))}
//     </>
//   );
// };
