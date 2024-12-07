"use client";

import { Ref, useRef, useState, useCallback } from "react";

const useHover = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const ref = useRef<T>();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const callbackRef = useCallback(
    (node: T) => {
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", handleMouseEnter);
        ref.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      ref.current = node;
      if (ref.current) {
        ref.current.addEventListener("mouseenter", handleMouseEnter);
        ref.current.addEventListener("mouseleave", handleMouseLeave);
      }
    },
    [handleMouseEnter, handleMouseLeave]
  );

  return [callbackRef, isHovered];
};

export default useHover;
