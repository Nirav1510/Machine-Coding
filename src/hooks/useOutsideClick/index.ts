"use client";

import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (e: any) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleChange);

    return () => {
      document.removeEventListener("click", handleChange);
    };
  }, []);

  return ref;
};

export default useOutsideClick;
