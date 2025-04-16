export function getRemainingTime(expiryTime: number): number {
  const now = Date.now();
  const remaining = expiryTime - now;
  return remaining > 0 ? remaining : 0;
}
