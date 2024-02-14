import { useState, useEffect } from "react";

export const DateAndTime = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const dateOptions: any = {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return (
    <div>
      <h2>{currentTime.toLocaleDateString(undefined, dateOptions)}</h2>
      <span>
        <i>{currentTime.toLocaleTimeString()}</i>
      </span>
    </div>
  );
};