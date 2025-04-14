import { useState, useEffect } from "react";

interface ExpiryCountdownResult {
  timeRemaining: number;
}

const SECOND = 1000;

const calculateTimeRemaining = (expiryTime: number): number => {
  const now = Date.now();
  const remaining = expiryTime - now;
  return remaining > 0 ? remaining : 0;
};

export default function useExpiryCountdown(
  expiryTime: number
): ExpiryCountdownResult {
  const [timeRemaining, setTimeRemaining] = useState<number>(
    calculateTimeRemaining(expiryTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining - SECOND <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimeRemaining - SECOND;
      });
    }, SECOND);

    return () => clearInterval(interval);
  }, []);

  return {
    timeRemaining,
  };
}
