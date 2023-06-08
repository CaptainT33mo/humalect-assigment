import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating); // Number of filled stars
  const hasHalfStar = rating % 1 !== 0; // Check if there is a half star
  const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0); // Number of empty stars

  return (
    <div className="flex">
      {[...Array(filledStars)].map((_, index) => (
        <BsStarFill
          className="w-5 h-5 stroke-yellow-700 fill-yellow-700"
          key={index}
        />
      ))}
      {hasHalfStar && (
        <BsStarHalf className="w-5 h-5 stroke-yellow-700 fill-yellow-700" />
      )}
      {[...Array(remainingStars)].map((_, index) => (
        <BsStar
          className="w-5 h-5 stroke-yellow-700 fill-yellow-700"
          key={index}
        />
      ))}
    </div>
  );
};

export default StarRating;
