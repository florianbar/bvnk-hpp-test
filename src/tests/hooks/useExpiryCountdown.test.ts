import { renderHook, act } from "@testing-library/react";

import useExpiryCountdown from "@/hooks/useExpiryCountdown";

describe("useExpiryCountdown", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should initialize with the correct remaining time", () => {
    const expiryTime = Date.now() + 10000; // 10 seconds from now
    const { result } = renderHook(() => useExpiryCountdown(expiryTime));

    expect(result.current.timeRemaining).toBeGreaterThan(9000);
    expect(result.current.timeRemaining).toBeLessThanOrEqual(10000);
  });

  it("should count down time correctly", () => {
    const expiryTime = Date.now() + 10000;
    const { result } = renderHook(() => useExpiryCountdown(expiryTime));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeRemaining).toBeGreaterThan(8000);
    expect(result.current.timeRemaining).toBeLessThanOrEqual(9000);
  });

  it("should return zero when time has expired", () => {
    const expiryTime = Date.now() + 10000;
    const { result } = renderHook(() => useExpiryCountdown(expiryTime));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.timeRemaining).toBe(0);
  });

  it("should handle past expiry times", () => {
    const pastTime = Date.now() - 5000;
    const { result } = renderHook(() => useExpiryCountdown(pastTime));

    expect(result.current.timeRemaining).toBe(0);
  });

  it("should cleanup interval on unmount", () => {
    const expiryTime = Date.now() + 10000;
    const { unmount } = renderHook(() => useExpiryCountdown(expiryTime));

    const setIntervalSpy = jest.spyOn(global, "setInterval");
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    unmount();

    expect(setIntervalSpy).not.toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
