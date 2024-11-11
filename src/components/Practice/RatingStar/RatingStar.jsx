"use client";

import React, { useState } from "react";

const RatingStar = ({
  totalStars = 5,
  initialRating = 0,
  onRate = () => {},
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    onRate(ratingValue); // callback function to handle rating change
  };

  const handleMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className='flex'>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill={starValue <= (hoverRating || rating) ? "gold" : "gray"}
            className='w-6 h-6 cursor-pointer'>
            <path d='M12 .587l3.668 7.429 8.2 1.182-5.934 5.79 1.4 8.162L12 18.897l-7.334 3.853 1.4-8.162-5.934-5.79 8.2-1.182z' />
          </svg>
        );
      })}
    </div>
  );
};

export default RatingStar;
