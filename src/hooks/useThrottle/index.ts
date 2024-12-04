"use client";

import { useState, useEffect } from "react";

const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    const lastRan = setTimeout(() => {
      setThrottledValue(value);
    }, limit);

    return () => {
      clearTimeout(lastRan);
    };
  }, [value, limit]);

  return throttledValue;
};

export default useThrottle;
