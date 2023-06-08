import { Typography } from "@material-tailwind/react";

export default function DefaultColumn({ children, color }) {
  return (
    <Typography
      variant="small"
      color={color || "blue-gray"}
      className="font-normal"
    >
      {children}
    </Typography>
  );
}
