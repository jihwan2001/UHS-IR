import { ResponsiveContainer } from "recharts";
import styled from "styled-components";

export const Box = styled.div`
  background-color: #fff;
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  height: 250px;
  /* width: 50%; */
  min-width: 280px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Title = styled.p`
  text-align: center;
  font-size: 1.125rem;
  font-weight: bold;
  span {
    text-align: right;
    font-size: 0.8rem;
  }
`;

export const ChartContainer = styled(ResponsiveContainer)`
  width: 100% !important;
  height: 180px !important;
`;
