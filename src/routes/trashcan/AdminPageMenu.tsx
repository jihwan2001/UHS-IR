// import styled from "styled-components";
// import { divMenus, IMenus } from "../atoms";
// import { useRecoilValue } from "recoil";
// import { useRef, useState } from "react";
// import plus from "../img/plus.png";
// import downArrow from "../img/downArrow.png";
// import rightArrow from "../img/rightArrow.png";
// import dot from "../img/dot.png";
// import MenuAdd from "./MenuAdd";
// import DotPage from "./DotPage";

// const Menus = styled.div`
//   width: 300px;
//   min-height: 724px;
//   /* border-right: 1px solid black; */
// `;

// const Lists = styled.div`
//   /* background-color: #e4e4e4; */
//   padding: 6px;
// `;

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const List = styled.div`
//   margin: 0 10px;
// `;

// const Imgs = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 24px;
//   height: 24px;
//   cursor: pointer;

//   &:hover {
//     background-color: #cacaca;
//     border-radius: 4px;
//   }
// `;

// const Img = styled.img`
//   width: 100%;
//   height: 100%;
// `;

// const MenuNav = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const SubMenu = styled.div`
//   padding-left: 40px;
//   div {
//     padding: 7px 0;
//   }
// `;

// const MenuHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const HeaderLeft = styled.div`
//   display: flex;
//   align-items: center;
// `;

// // 모달 배경 스타일 추가
// const ModalBackground = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5); /* 투명한 회색 배경 */
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000; /* 다른 요소 위에 표시 */
// `;

// const Year = styled.span`
//   display: block; /* 세로 정렬을 위해 block으로 설정 */
//   margin: 5px 0; /* 세로 간격 조정 */
//   padding: 5px 10px; /* 패딩 추가 */
//   background-color: #f0f0f0; /* 배경색 */
//   border-radius: 4px; /* 모서리 둥글게 */
//   border: 1px solid #ccc; /* 테두리 추가 */

//   &:hover {
//     background-color: #e0e0e0; /* 호버 시 배경색 변경 */
//     cursor: pointer;
//   }
// `;

// interface DotPosition {
//   index: number;
//   top: number;
//   left: number;
//   menuId: string; // menuId 타입을 keyof IMenus로 변경
// }
// interface IExels {
//   setExels: (value: boolean) => void;
//   setMainMenus: (value: string) => void;
//   setItem: (value: string) => void;
//   setYear: (value: string) => void;
//   setShowExcel: (value: boolean) => void;
//   showExcel: boolean;
// }

// function AdminPageMenu({
//   setExels,
//   setMainMenus,
//   setItem,
//   setYear,
//   setShowExcel,
//   showExcel,
// }: IExels) {
//   const setMenus = useRecoilValue(divMenus);
//   const menusKey = Object.keys(setMenus) as Array<keyof typeof setMenus>;
//   const [expanded, setExpanded] = useState<number[]>([]); // > 변경 확인
//   const [subExpanded, setSubExpanded] = useState<{ [key: string]: boolean }>(
//     {}
//   ); // 서브 메뉴 상태

//   const [add, setAdd] = useState(false);
//   const [id, setId] = useState("");
//   const [expandedDots, setExpandedDots] = useState<DotPosition | null>(null);

//   // 각 dot 이미지에 대한 ref
//   const dotRefs = useRef<(HTMLImageElement | null)[]>([]);

//   const toggleMenu = (index: number) => {
//     setExpanded((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [index]
//     );
//   };
//   const subToggleMenu = (key: string) => {
//     setSubExpanded((prev) => ({
//       // ...prev,
//       [key]: !prev[key],
//     }));
//   };
//   const toggleDot = (index: number) => {
//     const dotRef = dotRefs.current[index];

//     if (dotRef) {
//       const rect = dotRef.getBoundingClientRect();

//       if (rect) {
//         const top = rect.bottom + window.scrollY; // dot 이미지 아래에 위치
//         const left = rect.left + window.scrollX; // 왼쪽으로 약간 이동

//         setExpandedDots(
//           (prev) =>
//             prev && prev.index === index
//               ? null
//               : { index, top, left, menuId: String(menusKey[index]) } // menuId 추가
//         );
//       } else {
//         console.error("Unable to get bounding rect for the dot.");
//       }
//     } else {
//       console.warn(`No dot found at index: ${index}`);
//     }
//   };
//   return (
//     <Menus>
//       <Lists>
//         <Container>
//           <List>IR Center</List>
//           <Imgs>
//             <Img
//               src={plus}
//               alt="plus"
//               onClick={() => {
//                 setId("IR Center");
//                 setAdd(true);
//               }}
//             />
//           </Imgs>
//         </Container>

//         <MenuNav>
//           {menusKey.map((mainMenus, index) => (
//             <div key={index}>
//               <MenuHeader>
//                 <HeaderLeft>
//                   <Imgs
//                     onClick={() => {
//                       toggleMenu(index);
//                     }}
//                   >
//                     <Img
//                       src={expanded.includes(index) ? downArrow : rightArrow}
//                       alt="Toggle Menu"
//                     />
//                   </Imgs>
//                   <List>{mainMenus}</List>
//                 </HeaderLeft>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <Imgs onClick={() => toggleDot(index)}>
//                     <Img
//                       ref={(el) => (dotRefs.current[index] = el)} // ref 연결
//                       src={dot}
//                       alt="dot"
//                       style={{
//                         backgroundColor:
//                           expandedDots && expandedDots.index === index
//                             ? "#cacaca"
//                             : "",
//                       }}
//                     />
//                   </Imgs>
//                   <Imgs>
//                     <Img
//                       src={plus}
//                       alt="plus"
//                       onClick={() => {
//                         setId(String(mainMenus));
//                         setAdd(true);
//                       }}
//                     />
//                   </Imgs>
//                 </div>
//               </MenuHeader>

//               <div>
//                 <div key={index}>
//                   {expanded.includes(index) && (
//                     <SubMenu>
//                       {setMenus[mainMenus].map((item, subIndex) => {
//                         const subMenuKey = `${mainMenus}-${subIndex}`; // 서브 메뉴 키 생성\                                const a = [2019,2020,2021,2022,2023]
//                         const years = [2019, 2020, 2021, 2022, 2023];

//                         return (
//                           <div key={subIndex}>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                               }}
//                             >
//                               <Imgs
//                                 onClick={() => {
//                                   subToggleMenu(subMenuKey);
//                                 }}
//                               >
//                                 <Img
//                                   src={
//                                     subExpanded[subMenuKey]
//                                       ? downArrow
//                                       : rightArrow
//                                   }
//                                   alt="Sub Toggle Menu"
//                                 />
//                               </Imgs>
//                               {item}
//                             </div>
//                             {subExpanded[subMenuKey] && (
//                               <div
//                                 style={{
//                                   paddingLeft: "34px",
//                                 }}
//                               >
//                                 {years
//                                   .slice(mainMenus === "교원DB" ? 2 : 0)
//                                   .map((year) => (
//                                     <Year
//                                       key={year}
//                                       onClick={() => {
//                                         setExels(true);
//                                         setMainMenus(String(mainMenus));
//                                         setItem(item);
//                                         setYear(String(year));
//                                         setShowExcel(!showExcel);
//                                       }}
//                                     >
//                                       {year}
//                                     </Year>
//                                   ))}
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </SubMenu>
//                   )}
//                 </div>
//               </div>

//               {expandedDots && (
//                 <DotPage
//                   setExpandedDots={setExpandedDots} // 올바른 타입 전달
//                   position={{
//                     top: expandedDots.top,
//                     left: expandedDots.left,
//                   }}
//                   menuId={expandedDots.menuId as string} // menuId를 keyof IMenus로 변환하여 전달
//                 />
//               )}
//             </div>
//           ))}
//         </MenuNav>
//       </Lists>
//       {id && add && (
//         <ModalBackground>
//           <MenuAdd setAdd={setAdd} id={id} />
//         </ModalBackground>
//       )}
//     </Menus>
//   );
// }
// export default AdminPageMenu;
export {};
