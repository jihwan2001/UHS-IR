// 점 스타일 컴포넌트 그대로 유지
export const CustomDot = (props: { cx: any; cy: any; value: any }) => {
  const { cx, cy, value } = props;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="white"
        stroke="#28a745"
        strokeWidth={2}
      />
      <text x={cx} y={cy - 10} textAnchor="middle" fontSize="14px" fill="#333">
        {value}
      </text>
    </g>
  );
};

export const CustomDotRed = (props: { cx: any; cy: any; value: any }) => {
  const { cx, cy, value } = props;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="white"
        stroke="#dc3545"
        strokeWidth={2}
      />
      <text x={cx} y={cy - 10} textAnchor="middle" fontSize="14px" fill="#333">
        {value}%
      </text>
    </g>
  );
};
