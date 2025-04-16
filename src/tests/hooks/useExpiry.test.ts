import { renderHook, act } from "@testing-library/react";
import useExpiry from "@/hooks/useExpiry";

describe("useExpiry", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    if (typeof global.clearTimeout === "undefined") {
      global.clearTimeout = jest.fn();
    }
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("should call onExpiry when time expires", () => {
    const onExpiry = jest.fn();
    const expiryTime = Date.now() + 5000; // 5 seconds from now

    renderHook(() => useExpiry(expiryTime, onExpiry));

    expect(onExpiry).not.toHaveBeenCalled();

    // Advance time past expiry
    act(() => {
      jest.advanceTimersByTime(5001);
    });

    expect(onExpiry).toHaveBeenCalledTimes(1);
  });

  it("should call onExpiry immediately if expiry time is in the past", () => {
    const onExpiry = jest.fn();
    const pastTime = Date.now() - 5000; // 5 seconds ago

    renderHook(() => useExpiry(pastTime, onExpiry));

    expect(onExpiry).toHaveBeenCalledTimes(1);
  });

  it("should cleanup timeout on unmount", () => {
    const onExpiry = jest.fn();
    const expiryTime = Date.now() + 10000;
    const { unmount } = renderHook(() => useExpiry(expiryTime, onExpiry));

    jest.spyOn(global, "setTimeout");
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(onExpiry).not.toHaveBeenCalled();
  });

  it("should reset timeout when expiry date changes", () => {
    const onExpiry = jest.fn();
    const initialExpiryTime = Date.now() + 10000;

    const { rerender } = renderHook(
      ({ expiryDate, onExpiry }) => useExpiry(expiryDate, onExpiry),
      {
        initialProps: {
          expiryDate: initialExpiryTime,
          onExpiry,
        },
      }
    );

    // Change expiry time to 5 seconds from now
    const newExpiryTime = Date.now() + 5000;
    rerender({ expiryDate: newExpiryTime, onExpiry });

    // Advance time past new expiry
    act(() => {
      jest.advanceTimersByTime(5001);
    });

    expect(onExpiry).toHaveBeenCalledTimes(1);
  });

  it("should not set a timeout if expiry date is null", () => {
    const onExpiry = jest.fn();
    const { result } = renderHook(() => useExpiry(null, onExpiry));

    expect(result.current).toBeUndefined();
    expect(onExpiry).not.toHaveBeenCalled();
  });

  it("should clear current timeout if expiry date is null", () => {
    const onExpiry = jest.fn();
    const expiryTime = Date.now() + 10000;
    const { rerender } = renderHook(
      ({ expiryDate, onExpiry }) => useExpiry(expiryDate, onExpiry),
      {
        initialProps: {
          expiryDate: expiryTime,
          onExpiry,
        },
      }
    );

    // Set expiry date to null
    // @ts-expect-error: null is a valid input for testing edge case
    rerender({ expiryDate: null, onExpiry });

    expect(onExpiry).not.toHaveBeenCalled();
  });
});
