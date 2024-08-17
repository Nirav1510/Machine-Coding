"use client";

import React, { useState, useCallback, useRef } from "react";
import InfiniteScroll from "@/components/JsCafe/InfiniteScrolling/InfiniteScroll";

const InfiniteScrolling: React.FC = () => {
  const [query, setQuery] = useState<any>("");
  const [data, setData] = useState<any>([]);

  const controllerRef = useRef<any>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    []
  );

  const getData = useCallback((query: string, page: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (controllerRef?.current) {
          controllerRef?.current?.abort();
        }

        controllerRef.current = new AbortController();

        const url = `https://openlibrary.org/search.json?q=${query}&page=${page}`;
        const response = await fetch(url, {
          signal: controllerRef?.current?.signal,
        });

        const data = await response.json();
        setData((prev: []) => [...prev, ...data.docs]);
        console.log(data);
        resolve("");
      } catch (error) {
        console.error(error);
        reject("Something went wrong");
      }
    });
  }, []);

  const renderItem = useCallback(({ title }: any, key: any, ref?: any) => {
    return (
      <div key={key} ref={ref}>
        {title}
      </div>
    );
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <input
        type='text'
        value={query}
        onChange={handleChange}
        className='m-5 border-2 w-[15%]'
      />

      <InfiniteScroll
        query={query}
        listData={data}
        getData={getData}
        renderListItem={renderItem}
      />
    </div>
  );
};

export default InfiniteScrolling;
