"use client";

import { useState } from "react";

const useToggle = (on: boolean): [boolean, () => void] => {
  // your code here
  const [isToggle, setIsToggle] = useState(on);

  const toggle = () => {
    setIsToggle((prev) => !prev);
  };

  return [isToggle, toggle];
};

export default useToggle;
