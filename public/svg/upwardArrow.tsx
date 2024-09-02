import { TriangleProps } from "@/constants/types";

const UpArrow: React.FC<TriangleProps> = ({
  width = 200,
  height = 100,
  color = "black",
}) => {
  const points = `${width * 0.05},${height * 0.9} ${width * 0.95},${
    height * 0.9
  } ${width * 0.5},${height * 0.1}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polygon points={points} fill={color} />
    </svg>
  );
};

export default UpArrow;
