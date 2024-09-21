"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const InfiniteScroll = (props: any) => {
  const { query, listData, getData, renderListItem } = props;

  const pageRef = useRef(1);
  const observer = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    getData(query, pageRef.current).finally(() => {
      setLoading(false);
    });
  }, [query]);

  const lastElementObserver = (node: any) => {
    if (loading) return;

    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        pageRef.current += 1;
        fetchData();
      }
    });
    if (node) observer.current.observe(node);
  };

  const renderList = () => {
    return listData.map((item: any, index: number) => {
      if (index === listData.length - 1) {
        return (
          <div key={index} ref={lastElementObserver}>
            {item?.title}
          </div>
        );
      }
      return (
        <div key={index} ref={null}>
          {item?.title}
        </div>
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <>
      {renderList()}

      {loading && "Loading Entries..."}
    </>
  );
};

export default InfiniteScroll;
