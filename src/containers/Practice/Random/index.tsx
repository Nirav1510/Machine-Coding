"use client";

import React, { useEffect, useState, useLayoutEffect } from "react";

const Child = ({ count }: any) => {
  // useLayoutEffect(() => {
  //   console.log("child 1 useLayoutEffect");
  // });

  // useEffect(() => {
  //   console.log("child 1");
  // });

  // useEffect(() => {
  //   console.log("child 2");
  // });

  // useLayoutEffect(() => {
  //   console.log("child mount useLayoutEffect", count);

  //   return () => {
  //     console.log("child unmount useLayoutEffect", count);
  //   };
  // }, [count]);

  useEffect(() => {
    console.log("child mount", count);

    return () => {
      console.log("child unmount", count);
    };
  }, []);

  return <div className='text-2xl text-blue-400'>Child</div>;
};

const Random = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log("parent useLayoutEffect");
  // });

  // useEffect(() => {
  //   console.log("parent");
  // });

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-2xl text-green-400'>{count}</div>

      <button
        className='bg-red-300 p-4'
        onClick={() => setCount((prev) => prev + 1)}>
        Increment
      </button>

      {/* <Child /> */}

      {count < 3 && <Child count={count} />}
    </div>
  );
};

export default Random;
