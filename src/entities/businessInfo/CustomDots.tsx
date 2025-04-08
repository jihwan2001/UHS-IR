export const CustomDot = (props: {
  cx: number;
  cy: number;
  payload: { value: number };
}) => {
  const { cx, cy, payload } = props;

  const value = payload?.value;
  if (cx === undefined || cy === undefined || value === undefined) return null;

  const parsedValue = Number(value);
  if (isNaN(parsedValue)) return null;

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
        {parsedValue.toFixed(2).replace(/\.?0+$/, "")}
      </text>
    </g>
  );
};

export const CustomDotRed = (props: {
  cx: number;
  cy: number;
  payload: { value: number };
}) => {
  const { cx, cy, payload } = props;

  const value = payload?.value;
  if (cx === undefined || cy === undefined || value === undefined) return null;

  const parsedValue = Number(value);
  if (isNaN(parsedValue)) return null;

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
        {`${parsedValue.toFixed(2).replace(/\.?0+$/, "")}%`}
      </text>
    </g>
  );
};
