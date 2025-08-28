'use client';

import { useState, useEffect, useRef, useMemo } from "react";

const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;

  return function(...args: any[]) {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
	  func(...args);
	}, wait);
  };
};

const useInfiniteScroll = (
  fetchMoreItems: (page: number) => Promise<any>,
  debounceMs: number = 300
) => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadItems = async (pageNum: number) => {
    if (!hasMore) return;
    setShowLoader(true);

    try {
      const newItems = await fetchMoreItems(pageNum);

      if (!newItems || newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newItems]);
      }
    } finally {
      setShowLoader(false);
    }
  };

  // ✅ Debounced version of loadItems
  const debouncedLoadItems = useMemo(
    () =>
      debounce((pageNum: number) => {
        loadItems(pageNum);
      }, debounceMs),
    [debounceMs, hasMore]
  );

  useEffect(() => {
    debouncedLoadItems(page);
  }, [page, debouncedLoadItems]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

  return { items, loaderRef, showLoader, hasMore };
};

export default useInfiniteScroll;
