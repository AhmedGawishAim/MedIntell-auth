import { useEffect, useState } from "react";
import moment from "moment-timezone";

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    currentTime,
    userTimeZone: moment.tz.guess(),
  };
};
