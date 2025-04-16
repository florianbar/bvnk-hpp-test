import { useEffect, useState, useRef } from "react";

import { getRemainingTime } from "@/utils/time";

interface CountDownProps {
  expiryDate: number;
}

export default function CountDown({ expiryDate }: CountDownProps) {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const intervalIdRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    if (!expiryDate) {
      return;
    }

    setRemainingTime(getRemainingTime(expiryDate));

    intervalIdRef.current = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        if (prevRemainingTime - 1000 <= 0) {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
          }
          return 0;
        }
        return prevRemainingTime - 1000;
      });
    }, 1000);

    return () => {
      if (intervalIdRef.current) {
        clearTimeout(intervalIdRef.current);
      }
    };
  }, [expiryDate]);

  return <div>{remainingTime}</div>;
}
