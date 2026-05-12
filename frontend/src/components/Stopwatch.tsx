import React, { useState } from "react";
import Timer from "./Timer";

function StopWatch({
  isActive,
  setIsActive,
  isPaused,
  setIsPaused,
  time,
  setTime,
}) {
  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  return (
    <div className="stop-watch">
      <Timer time={time} />
    </div>
  );
}

export default StopWatch;
