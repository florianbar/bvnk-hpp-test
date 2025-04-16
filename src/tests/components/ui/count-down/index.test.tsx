import { render, act } from "@testing-library/react";
import CountDown from "@/components/ui/count-down";

describe("CountDown", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    if (typeof global.clearInterval === "undefined") {
      global.clearInterval = jest.fn();
    }
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("should display initial time correctly", () => {
    const now = Date.now();
    const futureTime = now + 5000; // 5 seconds in the future

    jest.setSystemTime(now);

    const { container } = render(<CountDown expiryDate={futureTime} />);
    expect(container).toHaveTextContent("00:00:05");
  });

  it("should count down every second", () => {
    const now = Date.now();
    const futureTime = now + 3000; // 3 seconds in the future

    jest.setSystemTime(now);

    const { container } = render(<CountDown expiryDate={futureTime} />);

    expect(container).toHaveTextContent("00:00:03");

    // Advance 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(container).toHaveTextContent("00:00:02");

    // Advance another second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(container).toHaveTextContent("00:00:01");
  });

  it("should stop at 00:00:00 when time expires", () => {
    const now = Date.now();
    const futureTime = now + 2000; // 2 seconds in the future

    jest.setSystemTime(now);

    const { container } = render(<CountDown expiryDate={futureTime} />);

    // Advance past expiry time
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(container).toHaveTextContent("00:00:00");
  });

  it("should handle null expiry date", () => {
    const { container } = render(<CountDown expiryDate={null} />);
    expect(container).toHaveTextContent("00:00:00");
  });

  it("should clear interval on unmount", () => {
    const now = Date.now();
    const futureTime = now + 5000;

    jest.setSystemTime(now);

    const { unmount } = render(<CountDown expiryDate={futureTime} />);

    // Spy on clearInterval
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it("should reset countdown when expiry date changes", () => {
    const now = Date.now();
    const initialExpiryTime = now + 5000;

    jest.setSystemTime(now);

    const { container, rerender } = render(
      <CountDown expiryDate={initialExpiryTime} />
    );
    expect(container).toHaveTextContent("00:00:05");

    // Change expiry time to 3 seconds from now
    const newExpiryTime = now + 3000;
    rerender(<CountDown expiryDate={newExpiryTime} />);
    expect(container).toHaveTextContent("00:00:03");
  });
});
