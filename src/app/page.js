"use client";

import {
  Card,
  Option,
  Radio,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "../components/Pagination";
import Link from "next/link";
import DefaultColumn from "../components/Table/DefaultColumn";
import DiscountPrice from "../components/DiscountedPrice";
import ProductCard from "@/components/ProductCard";
import { getDiscountPrice } from "./../utils/helpers";

const TABLE_HEAD = [
  { label: "Id", key: "id" },
  { label: "Title", key: "title" },
  { label: "Category", key: "category" },
  { label: "Price", key: "price" },
  { label: "Discounted Price", key: "discountPercentage" },
];

const ROWS_PER_PAGE = ["10", "20", "30", "50", "100"];

export default function ProductsList() {
  const queryClient = useQueryClient();
  const [layout, setLayout] = useState("table");
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState("10");

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["products-list", activePage, rowsPerPage],
    queryFn: () => getProductsList(activePage, parseInt(rowsPerPage)),
    keepPreviousData: true,
  });

  const getProductsList = async (page, rows) => {
    const skip = (page - 1) * rows;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?limit=${rows}&skip=${skip}`
    );
    const users = await res.json();
    return users;
  };

  const handleRowsPerPageChange = (val) => {
    setRowsPerPage(val);
    setActivePage(1);
    queryClient.invalidateQueries({ queryKey: ["products-list"] });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex items-center justify-between bg-white w-full rounded-xl rounded-b-none p-4">
        <div className="flex items-center">
          <Typography color="blue-gray" className="font-medium mr-3">
            Layout:
          </Typography>
          <div
            className="flex gap-5"
            onChange={(e) => setLayout(e.target.value)}
          >
            <Radio
              id="table"
              name="type"
              label="Table"
              defaultChecked
              value="table"
            />
            <Radio id="card" name="type" label="Card" value="card" />
          </div>
        </div>
        <div className="flex items-center">
          <Select
            size="md"
            className="min-w-[120px]"
            label="Rows per page"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            {ROWS_PER_PAGE.map((item, idx) => (
              <Option
                key={idx}
                value={item}
                className="flex items-center gap-2"
              >
                {item}
              </Option>
            ))}
          </Select>
          <Pagination
            active={activePage}
            setActive={setActivePage}
            totalPages={data ? Math.ceil(data.total / rowsPerPage) : 0}
          />
        </div>
      </div>
      {layout === "table" ? (
        <Card className="overflow-auto h-full w-full rounded-t-none">
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
                  (
                    { id, title, category, price, discountPercentage },
                    index
                  ) => {
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
                          <DefaultColumn>${price}</DefaultColumn>
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
      ) : (
        <div className="grid grid-cols-5 gap-4 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg mt-5">
          {data?.products?.map(
            ({ id, title, category, price, discountPercentage, thumbnail }) => {
              const discountedPrice = getDiscountPrice(
                price,
                discountPercentage
              );
              return (
                <Link key={id} href={`/products/${id}`}>
                  <ProductCard
                    id={id}
                    title={title}
                    category={category}
                    price={price}
                    discountedPrice={discountedPrice}
                    image={thumbnail}
                  />
                </Link>
              );
            }
          )}
        </div>
      )}
    </main>
  );
}
