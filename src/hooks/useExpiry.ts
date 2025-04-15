import { useEffect } from "react";

export default function useExpiry(expiryDate: number, onExpiry: () => void) {
  useEffect(() => {
    const now = Date.now();
    const diff = expiryDate - now;
    const delay = Math.floor(diff);

    if (delay <= 0) {
      onExpiry();
      return;
    }

    const timeoutId = setTimeout(onExpiry, delay);
    return () => clearTimeout(timeoutId);
  }, [expiryDate, onExpiry]);
}
