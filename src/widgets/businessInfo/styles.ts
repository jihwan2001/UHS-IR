import { ResponsiveContainer } from "recharts";
import styled from "styled-components";

export const NavContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

export const NavItem = styled.p`
  font-size: 1.125rem;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &.active {
    color: #0f2280;
    font-weight: bold;
  }

  &:not(.active) {
    color: black;
  }
`;

export const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); // 중요!
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

export const ChartContainer = styled(ResponsiveContainer)`
  width: 100% !important;
  height: 180px !important;
`;
