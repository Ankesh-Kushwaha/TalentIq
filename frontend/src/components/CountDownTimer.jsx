import { useEffect, useState } from "react";

export default function CountdownTimer({ endTime }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(endTime) - new Date();
      if (diff <= 0) {
        setTime("Contest Ended");
        clearInterval(interval);
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return <span className="text-yellow-400">{time}</span>;
}
