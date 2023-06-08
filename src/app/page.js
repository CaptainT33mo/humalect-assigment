"use client";

import { Card, Radio, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "../components/Pagination";
import Link from "next/link";
import DefaultColumn from "../components/Table/DefaultColumn";
import DiscountPrice from "../components/DiscountedPrice";

const TABLE_HEAD = [
  { label: "Id", key: "id" },
  { label: "Title", key: "title" },
  { label: "Category", key: "category" },
  { label: "Price", key: "price" },
  { label: "Discounted Price", key: "discountPercentage" },
];

export default function ProductsList() {
  const [layout, setLayout] = useState("table");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["products-list", activePage],
    queryFn: () => getProductsList(activePage),
    keepPreviousData: true,
  });

  const getProductsList = async (activePage) => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${activePage - 1}0`
    );
    const users = await res.json();
    return users;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="overflow-scroll h-full w-full">
        <div className="">
          <div className="flex gap-10">
            <Radio
              id="table"
              name="type"
              label="Table"
              defaultChecked
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
            />
            <Radio
              id="card"
              name="type"
              label="Card"
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
            />
          </div>
          <Pagination
            active={activePage}
            setActive={setActivePage}
            totalPages={data ? Math.max(data.total / data.limit) : 0}
          />
        </div>
        <div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head.key}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head.label}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.products?.map(
                ({ id, title, category, price, discountPercentage }, index) => {
                  const isLast = index === data?.products?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <DefaultColumn>{id}</DefaultColumn>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <DefaultColumn color="blue">
                          <Link href={`/products/${id}`}>{title}</Link>
                        </DefaultColumn>
                      </td>
                      <td className={classes}>
                        <DefaultColumn>{category}</DefaultColumn>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <DefaultColumn color={"blue"}>${price}</DefaultColumn>
                      </td>
                      <td className={`${classes}`}>
                        <DiscountPrice
                          value={price}
                          discountPercentage={discountPercentage}
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
