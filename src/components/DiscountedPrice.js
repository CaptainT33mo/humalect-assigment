import { Typography } from "@material-tailwind/react";

export default function DiscountPrice({ value, discountPercentage, text }) {
  var discountAmount = (value * discountPercentage) / 100;
  var discountedPrice = value - discountAmount;
  return (
    <Typography variant="small" color="blue-gray" className="font-normal">
      {text || ""}${discountedPrice.toFixed(2)}
    </Typography>
  );
}
