import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { MenuDatas } from "../../entities";
import { FileName } from "./styles";
import { NoticesAddPage, NoticesDetailPage } from "../../pages"; // ✅ 공지사항 추가 페이지 import
import { InquiryClearForm, InquiryUnClearForm } from "../../widgets";

// ✅ 개별 파일 import 매핑
const pageModules: { [key: string]: () => Promise<any> } = {
  "1": () => import("./infoAnalysis/BusinessInfo"),
  "2": () => import("./infoAnalysis/AcademicInfo"),
  "3": () => import("./infoAnalysis/Employment"),
  "4": () => import("./infoAnalysis/Research"),
  "5": () => import("./infoAnalysis/StudentSupport"),
  "6": () => import("./analysisResources/StudentsInfo"),
  "7": () => import("./analysisResources/TeachersInfo"),
  "8": () => import("./analysisResources/ExternalInfo"),
  "9": () => import("./utilization/ReportManagement"),
  "10": () => import("./utilization/Simulation"),
  "11": () => import("./utilization/LiveData"),
  "12": () => import("./utilization/InstantSimulation"),
  "13": () => import("./officialsiteManagement/Notices"),
  "14": () => import("./officialsiteManagement/Inquiries"),
  "15": () => import("./officialsiteManagement/Reports"),
  "16": () => import("./userManagement/UserPermissions"),
};

// ✅ NotFound 페이지 로드
const NotFound = lazy(() =>
  import("../NotFound").then((module) => ({ default: module.NotFound }))
);

// ✅ 동적으로 import한 모듈을 `default export`로 변환
const loadComponent = (key: string) =>
  lazy(() =>
    pageModules[key]!()
      .then((module) => {
        const componentName = Object.keys(module)[0]; // 첫 번째 export된 컴포넌트 찾기
        return { default: module[componentName] };
      })
      .catch(() =>
        import("../NotFound").then((module) => ({ default: module.NotFound }))
      )
  );

export const DataCenter = () => {
  const { id, "*": subPath } = useParams<{ id: string; "*": string }>(); // ✅ 추가 경로 감지

  // ✅ `/datacenter/:id/add`라면 NoticesAddPage 표시
  // ✅ `/datacenter/:id/detial`라면 NoticesDetailPage 표시
  const PageComponent =
    subPath === "add"
      ? NoticesAddPage
      : subPath === "detail"
      ? NoticesDetailPage
      : subPath === "clearPage"
      ? InquiryClearForm
      : subPath === "unClearPage"
      ? InquiryUnClearForm
      : pageModules[id || ""]
      ? loadComponent(id!)
      : NotFound;
  return (
    <>
      {/* 어떤 페이지에 있는지 이름 보여주기 */}
      <FileName>
        {MenuDatas.find((menu) =>
          menu.children.some((child) => child.id === id)
        )?.children.find((child) => child.id === id)?.name ||
          "페이지를 찾을 수 없습니다."}
      </FileName>

      {/* 선택한 페이지 렌더링 */}
      <Suspense fallback={<h2>로딩 중...</h2>}>
        <PageComponent />
      </Suspense>
    </>
  );
};
