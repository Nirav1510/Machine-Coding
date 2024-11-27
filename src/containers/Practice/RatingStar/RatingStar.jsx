"use client";

import React from "react";
import RatingStar from "../../../components/Practice/RatingStar/RatingStar";

const RatingStarApp = () => {
  const handleRatingChange = (rating) => {
    console.log("Selected Rating:", rating);
  };

  return (
    <div>
      <h2>Rate this product:</h2>
      <RatingStar
        totalStars={5}
        initialRating={3}
        onRate={handleRatingChange}
      />
    </div>
  );
};

export default RatingStarApp;
