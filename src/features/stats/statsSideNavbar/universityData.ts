import { PdfItem } from "../types";

export const universityData: {
  category: string;
  items: PdfItem[];
}[] = [
  {
    category: "교육여건",
    items: [
      { baseName: "주문식 교육과정 설치 운영 현황", groupName: "교육여건" },
      { baseName: "학생 규모별 강좌수", groupName: "교육여건" },
      { baseName: "교원 강의 담당 비율", groupName: "교육여건" },
      { baseName: "국가별 외국인 전임교원 현황", groupName: "교육여건" },
      { baseName: "기숙사 수용 현황", groupName: "교육여건" },
      { baseName: "기숙사 운영 결과(사립_직영)", groupName: "교육여건" },
      { baseName: "기숙사 운영 결과(사립_행복_민자)", groupName: "교육여건" },
      { baseName: "기숙사비 납부제도 현황", groupName: "교육여건" },
      { baseName: "대학 강의 공개 현황", groupName: "교육여건" },
      { baseName: "전공계열별 외국인 전임교원 현황", groupName: "교육여건" },
    ],
  },
  {
    category: "교육연구성과",
    items: [
      { baseName: "학생의 창업 및 창업지원 현황", groupName: "교육연구성과" },
      { baseName: "교원의 창업 및 창업지원 현황", groupName: "교육연구성과" },
      { baseName: "기숙사비 납부제도 현황", groupName: "교육연구성과" },
      { baseName: "대학의 사회봉사 역량", groupName: "교육연구성과" },
      { baseName: "졸업생의 진학 현황", groupName: "교육연구성과" },
      { baseName: "창업교육 지원 현황", groupName: "교육연구성과" },
    ],
  },
  {
    category: "대학운영",
    items: [
      { baseName: "학교기업 운영현황", groupName: "대학운영" },
      { baseName: "대학별 평가 인증 현황", groupName: "대학운영" },
      { baseName: "법정부담금 부담 현황", groupName: "대학운영" },
      { baseName: "산학협력단 고용주체별 인력 현황", groupName: "대학운영" },
      { baseName: "산학협력단 담당업무별 인력 현황", groupName: "대학운영" },
      { baseName: "시설 안전관리 현황", groupName: "대학운영" },
      { baseName: "실험실습실 안전관리 현황", groupName: "대학운영" },
      {
        baseName: "안전관리 계획 및 안전사고 보험(공제) 현황",
        groupName: "대학운영",
      },
      { baseName: "정보보안 및 개인정보보호 수준 진단", groupName: "대학운영" },
      { baseName: "학교 특성화 현황", groupName: "대학운영" },
    ],
  },
  {
    category: "대학재정",
    items: [],
  },
  {
    category: "대학재정교육비",
    items: [
      { baseName: "입학전형 관련 지출 현황", groupName: "대학재정교육비" },
      { baseName: "교비회계 적립금 운용계획서", groupName: "대학재정교육비" },
      { baseName: "교비회계(통합)", groupName: "대학재정교육비" },
      { baseName: "등록금 납부제도 현황", groupName: "대학재정교육비" },
      { baseName: "등록금 현황", groupName: "대학재정교육비" },
      { baseName: "등록금회계", groupName: "대학재정교육비" },
      { baseName: "법정부담금 부담 현황", groupName: "대학재정교육비" },
      { baseName: "비등록금회계", groupName: "대학재정교육비" },
      { baseName: "수익용 기본재산 확보 현황", groupName: "대학재정교육비" },
      { baseName: "운영(손익) 계산서", groupName: "대학재정교육비" },
      { baseName: "현금예산서(예산)", groupName: "대학재정교육비" },
      { baseName: "입학전형료 산정 근거", groupName: "대학재정교육비" },
      { baseName: "입학전형료 수입 현황", groupName: "대학재정교육비" },
      { baseName: "자금계산서(결산)", groupName: "대학재정교육비" },
      { baseName: "자금예산서(예산)", groupName: "대학재정교육비" },
      { baseName: "장학금 수혜 현황", groupName: "대학재정교육비" },
      { baseName: "재무상태표", groupName: "대학재정교육비" },
      { baseName: "창업교육 지원 현황", groupName: "대학재정교육비" },
      { baseName: "학생 1인당 교육비(사립)", groupName: "대학재정교육비" },
      { baseName: "학자금 대출 현황", groupName: "대학재정교육비" },
      { baseName: "현금흐름표(결산)", groupName: "대학재정교육비" },
    ],
  },
  {
    category: "학생",
    items: [
      { baseName: "캡스톤 디자인(창의적 설계) 운영 현황", groupName: "학생" },
      { baseName: "계약학과 설치 운영 현황", groupName: "학생" },
      { baseName: "교양과목 성적 분포", groupName: "학생" },
      { baseName: "외국대학과 학점 교류 현황", groupName: "학생" },
      { baseName: "외국학생 중도탈락 현황", groupName: "학생" },
      { baseName: "외국학생 현황", groupName: "학생" },
      { baseName: "재학생 충원율", groupName: "학생" },
      { baseName: "전공과목 성적 분포", groupName: "학생" },
      { baseName: "졸업생의 졸업성적 분포", groupName: "학생" },
      { baseName: "주문식 교육과정 설치 운영 현황", groupName: "학생" },
      { baseName: "현장실습 운영 현황", groupName: "학생" },
      { baseName: "편입생 모집요강", groupName: "학생" },
      { baseName: "편입학 선발 결과", groupName: "학생" },
    ],
  },
];
