import styled from "styled-components";

export const OverviewContainer = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  p {
    color: #0f2280;
  }
`;

export const SubTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
`;

export const GoalsContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
`;

export const GoalsCardContainer = styled.div`
  display: flex;
  align-items: center; /* ✅ 가운데 정렬 */
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* ✅ 메인 목표 카드 (배경색 #0F2280, 글씨 흰색, 가운데 정렬, 고정 크기) */
export const GoalCard = styled.div`
  padding: 15px;
  width: 250px; /* ✅ 고정 크기 */
  height: 160px;
  background-color: #0f2280; /* ✅ 배경색 */
  color: white; /* ✅ 글씨 색상 */
  border-radius: 8px;
  font-size: 18px;
  text-align: center; /* ✅ 텍스트 가운데 정렬 */
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SubGoalCard = styled.div`
  padding: 15px;
  width: 400px; /* ✅ 크기 조정 */
  background-color: rgba(15, 34, 128, 0.2);
  color: black; /* ✅ 글씨 색상 */
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  text-align: left; /* ✅ 텍스트 왼쪽 정렬 */
  display: flex;
  align-items: center;
`;

export const RolesContainer = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  text-align: center;
`;

export const RoleGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
`;

export const RoleCard = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(15, 34, 128, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);

  /* ✅ RoleCard의 두 번째, 네 번째 요소만 배경색을 흰색으로 변경 */
  &:nth-child(2),
  &:nth-child(4) {
    background-color: white;
    border: 2px solid rgba(15, 34, 128, 0.2);
  }
`;

export const RoleImage = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
`;
