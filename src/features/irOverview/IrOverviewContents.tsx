import {
  OverviewContainer,
  Title,
  Description,
  GoalCard,
  GoalsCardContainer,
  GoalsContainer,
  SubTitle,
  Cards,
  SubGoalCard,
  RoleCard,
  RoleGrid,
  RoleImage,
  RolesContainer,
} from "./styles";

import dataIcon from "../../img/dataIcon.png";
import analysisIcon from "../../img/analysisIcon.png";
import groupIcon from "../../img/groupIcon.png";
import policyIcon from "../../img/policyIcon.png";

export const IrOverviewContents = () => {
  return (
    <>
      <OverviewContainer>
        <Title>
          <p>IR 센터 개요</p>
        </Title>
      </OverviewContainer>

      <OverviewContainer>
        <SubTitle>
          <p>센터</p>
        </SubTitle>
        <Description>
          <p>협성대학교 IR 센터는 데이터 기반 대학성과관리를 통하여</p>
          <p>대학의 다양한 정책수립과 합리적인 의사결정을 지원하고 있습니다.</p>
          <p>
            이를 통해 우리대학의 혁신과 변화를 유도하고, 재정운용의 효율성을
            확보하며,
          </p>
          <p>
            의사결정의 투명성을 제고하여 대학발전과 교육혁신을 이끌어가고자
            합니다.
          </p>
        </Description>
      </OverviewContainer>

      <GoalsContainer>
        <SubTitle>목표</SubTitle>
        <Description>
          <p>
            데이터 기반의 전략적 의사결정과 효율적인 대학 운영을 목표로 하며,
          </p>
          <p>이를 이뤄내기 위해 세부 목표를 설정하고 시행합니다.</p>
        </Description>
        <GoalsCardContainer>
          <GoalCard>데이터 기반 전략적 의사결정과 효율적인 대학 운영</GoalCard>
          <Cards>
            <SubGoalCard>📌 대학 발전 계획과 연계한 성과관리</SubGoalCard>
            <SubGoalCard>📌 학생 학업 지원 및 관리</SubGoalCard>
            <SubGoalCard>📌 정책기획 및 주요 의사결정 관리</SubGoalCard>
          </Cards>
        </GoalsCardContainer>
      </GoalsContainer>

      <RolesContainer>
        <SubTitle>역할</SubTitle>
        <Description>
          <p>
            대내·외 모든 데이터를 수집 및 관리하며, 대학 발전을 위한 학교 성과와
            학생 역량 강화를 위한 학생 교육 환경을 분석 및 환류합니다. 또한
            실질적으로 시행되고 발전할 수 있도록 정책 수립을 위한 의사결정
            지원합니다.
          </p>
        </Description>
        <RoleGrid>
          <RoleCard>
            <RoleImage src={dataIcon} alt="데이터 통합 관리" />
            <p>데이터 통합 관리</p>
          </RoleCard>
          <RoleCard>
            <RoleImage src={analysisIcon} alt="대학 성과 분석 및 환류" />
            <p>대학 성과 분석 및 환류</p>
          </RoleCard>
          <RoleCard>
            <RoleImage src={groupIcon} alt="학생 교육 환경 분석 및 환류" />
            <p>학생 교육 환경 분석 및 환류</p>
          </RoleCard>
          <RoleCard>
            <RoleImage src={policyIcon} alt="정책 수립" />
            <p>정책 수립</p>
          </RoleCard>
        </RoleGrid>
      </RolesContainer>
    </>
  );
};
