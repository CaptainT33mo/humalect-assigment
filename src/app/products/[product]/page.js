"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import StarRating from "../../../components/StarRating";
import { getDiscountPrice } from "../../../utils/helpers";

export default function ProductDescription({ params }) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["product-description"],
    queryFn: () => getProductDescription(),
    keepPreviousData: true,
  });

  const getProductDescription = async () => {
    const res = await fetch(`https://dummyjson.com/products/${params.product}`);
    const product = await res.json();
    return product;
  };

  const discountedPrice = getDiscountPrice(
    data?.price,
    data?.discountPercentage
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data?.id && (
        <Card className="flex-row w-full max-w-[48rem] pb-4">
          <CardHeader
            shadow={false}
            floated={false}
            className="w-2/4 shrink-0 m-0 rounded-r-none"
          >
            <Typography
              variant="h4"
              color="blue-gray"
              className="px-4 pt-4 mb-4"
            >
              {data.title}
            </Typography>
            <div className="ml-3 rounded-lg overflow-hidden">
              <Image
                src={data.thumbnail}
                alt={data.title}
                width={500}
                height={500}
              />
            </div>
          </CardHeader>
          <CardBody>
            <Typography
              variant="h5"
              mb-4
              color="gray"
              className="font-normal mt-10 mb-8"
            >
              {data.description}
            </Typography>
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-medium mb-4"
            >
              Original Price{" "}
              <span className="font-semibold">${data.price}</span>
            </Typography>
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-medium mb-4"
            >
              Discounted Price{" "}
              <span className="font-semibold">${discountedPrice}</span>
            </Typography>
            <div className="flex items-center">
              <Typography color="blue-gray" className="font-medium mr-3">
                Rating
              </Typography>
              <StarRating rating={data.rating} />
              <Typography color="blue-gray" className="font-medium ml-3">
                {data.rating}
              </Typography>
            </div>
          </CardBody>
        </Card>
      )}
    </main>
  );
}
