"use client";

import React, { useEffect, useRef, useState } from "react";

const totalMs = 10 * 1000;
const interval = 1 * 1000;
const totalCycles = totalMs / interval;
const progressMade = (interval / totalMs) * 100;

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const timer = useRef<any>(null);
  const cycleCompleted = useRef(0);

  useEffect(() => {
    timer.current = setInterval(() => {
      setProgress((prev) => prev + progressMade);
      cycleCompleted.current += 1;

      if (cycleCompleted.current === totalCycles) {
        clearInterval(timer.current);
      }
    }, interval);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div className='progress-bar w-[300px] h-[40px] overflow-hidden relative rounded-[18px] bg-[#f1dddd]'>
      <div
        style={{ transform: `translate(${progress - 100}%)` }}
        className='w-full h-full absolute bg-[greenYellow] transition-transform ease-in duration-500'
      />
    </div>
  );
};

export default ProgressBar;
