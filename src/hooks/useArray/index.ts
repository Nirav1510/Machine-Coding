"use client";

import { useState, useCallback } from "react";

type UseArrayActions<T> = {
  push: (item: T) => void;
  removeByIndex: (index: number) => void;
  clear: () => void;
  replace: (index: number, item: T) => void;
};

const useArray = <T>(
  initialValue: T[]
): { value: T[] } & UseArrayActions<T> => {
  const [val, setVal] = useState<T[]>(initialValue);

  const push = useCallback((item: T) => setVal((prev) => [...prev, item]), []);

  const removeByIndex = useCallback((index: number) => {
    setVal((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setVal([]), []);

  const replace = useCallback((index: number, item: T) => {
    setVal((prev) => prev.map((current, i) => (i === index ? item : current)));
  }, []);

  return { value: val, push, removeByIndex, clear, replace };
};

export default useArray;
