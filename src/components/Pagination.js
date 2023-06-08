import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

export default function Pagination({
  active,
  setActive,
  //   onPageChange,
  totalPages,
}) {
  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 5;
    const maxLeftPages = Math.floor(maxVisiblePages / 2);
    const maxRightPages = Math.ceil(maxVisiblePages / 2);

    let startPage = active - maxLeftPages;
    let endPage = active + maxRightPages;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxVisiblePages;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxVisiblePages + 1;
      if (startPage < 1) startPage = 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "blue-gray",
    onClick: () => {
      setActive(index);
      //   onPageChange(index);
    },
  });

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
    // onPageChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    // onPageChange(active - 1);
  };

  const renderPageButtons = () => {
    const pageRange = getPageRange();

    return pageRange.map((pageNumber) => (
      <IconButton key={pageNumber} {...getItemProps(pageNumber)}>
        {pageNumber}
      </IconButton>
    ));
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <HiArrowLeft strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {renderPageButtons()}
        {totalPages > 5 && active + 2 < totalPages && (
          <span className="text-blue-gray">...</span>
        )}
        {totalPages > 5 && active + 1 < totalPages && (
          <IconButton {...getItemProps(totalPages)}>{totalPages}</IconButton>
        )}
      </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalPages}
      >
        Next
        <HiArrowRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
