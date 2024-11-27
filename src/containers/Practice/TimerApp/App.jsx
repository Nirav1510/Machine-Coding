"use client";

// - Implement a timer hook that goes from 0 to infinity every second increasing value. That should have pause, resume, and reset functionalities
// Two Cards with  pause, resume, and reset buttons - both should work separately using the timer hook

// useTimer() , <Timer />
// Two Cards with  pause, resume, and reset buttons - both should work separately using the timer hook
// API -> [{ label: ‘TimerA’, delay: 100  }, { label: ‘TimerB’, delay: 1000  }, { label: ‘TimerC’, delay: 2000  } ]

// Timer Card:
// <Label>
// [timer: 00]
// [Pause ] [Resume] [Reset]

import React from "react";
import Timer from "@/components/Practice/Timer/Timer";

const timerResponse = [
  { label: "TimerA", delay: 100 },
  { label: "TimerB", delay: 1000 },
  { label: "TimerC", delay: 2000 },
];

const TimerApp = () => {
  return (
    <di className='flex flex-col justify-center items-center gap-3'>
      {Array.isArray(timerResponse) &&
        timerResponse.map((item) => (
          <div
            key={`timer-${item?.label}`}
            className='flex justify-center items-center w-full'>
            <Timer label={item?.label} delay={item?.delay} />
          </div>
        ))}
    </di>
  );
};

export default TimerApp;
