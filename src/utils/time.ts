export function getRemainingTime(expiryTime?: number | null): number {
  if (!expiryTime) {
    return 0;
  }

  const now = Date.now();
  const remaining = expiryTime - now;
  return remaining > 0 ? remaining : 0;
}

export function getDisplayTimeFromSeconds(seconds: number): string {
  if (seconds < 0) {
    return "00:00:00";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
