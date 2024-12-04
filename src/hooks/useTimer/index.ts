"use client";

import { useState, useEffect, useRef } from "react";

const useTimer = (delay = 1000) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const starInterval = () => {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, delay);
    };

    if (running) {
      starInterval();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running, delay]);

  const onPause = () => {
    setRunning(false);
  };

  const onPlay = () => {
    setRunning(true);
  };

  const onRestart = () => {
    setTime(0);
  };

  const onReset = () => {
    setRunning(false);
    setTime(0);
  };

  return [time, onPlay, onPause, onReset, onRestart];
};

export default useTimer;
