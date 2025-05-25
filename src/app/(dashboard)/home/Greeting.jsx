"use client"
import { useCurrentTime } from "@/hooks/useCurrentTime";

export const Greeting = ({ displayName="unknown" }) => {
  const { currentTime, userTimeZone } = useCurrentTime();

  if (!currentTime) return null;

  const localTime = currentTime.tz(userTimeZone);

  const hour = localTime.format("H");
  const date = localTime.format("MMM D");
  const weekDay = localTime.format("dddd");
  const timeString = localTime.format("HH:mm");

  const greeting = parseInt(hour, 10) < 12 ? "Morning" : parseInt(hour, 10) < 18 ? "Afternoon" : "Evening";

  return (
    <div className="flex justify-between">
      <div>
        <h3 className="text-xl font-semibold text-center">
          Good {greeting}, {displayName}
        </h3>
        <h6 className="flex items-center gap-2 font-medium text-slate-400">
          <div>{greeting === "Morning" ? "🌤️" : greeting === "Afternoon" ? "🌥️" : "🌙️"}</div>
          <div>
            {weekDay}, {date} {timeString}
          </div>
        </h6>
      </div>
    </div>
  );
};
