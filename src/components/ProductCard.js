import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

function ProductCard({ image, price, id, category, discountedPrice, title }) {
  return (
    <Card className="w-96">
      <CardHeader shadow={false} floated={false} className="h-96">
        <Image
          src={image}
          className="w-full h-full object-cover"
          width={500}
          height={500}
          alt={title}
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-medium text-left"
          >
            {id}. {title}
          </Typography>
        </div>
        <div className="flex items-center my-4">
          <Typography color="blue-gray" className="font-semibold text-lg mr-3">
            ${discountedPrice}
          </Typography>
          <Typography
            color="blue-gray"
            className="font-semibold text-sm line-through"
          >
            ${price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal text-left"
        >
          Category: {category}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
