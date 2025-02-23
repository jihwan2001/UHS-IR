import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    pointer-events: none;
  }

  th,
  td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  tbody tr:hover {
    background: #f5f5f5;
  }
`;
