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
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-teal-500 text-lg">
        {currentTime.toLocaleDateString(undefined, dateOptions)}
      </h2>
      <span className="text-gray-400 text-sm">
        <i>{currentTime.toLocaleTimeString()}</i>
      </span>
    </div>
  );
};
