import { useEffect, useRef } from "react";

export default function useExpiry(
  expiryDate: number | null,
  onExpiry: () => void
) {
  const timeoutIdRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    if (!expiryDate) {
      return;
    }

    const now = Date.now();
    const diff = expiryDate - now;
    const delay = Math.floor(diff);

    if (delay <= 0) {
      onExpiry();
      return;
    }

    timeoutIdRef.current = setTimeout(onExpiry, delay);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [expiryDate, onExpiry]);
}
