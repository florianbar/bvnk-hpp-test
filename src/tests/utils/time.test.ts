import { getRemainingTime, getDisplayTimeFromSeconds } from "@/utils/time";

describe("getRemainingTime", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return remaining time in seconds", () => {
    const now = Date.now();
    const futureTime = now + 5000; // 5 seconds in the future

    jest.setSystemTime(now);

    const remainingTime = getRemainingTime(futureTime);
    expect(remainingTime).toBe(5000);
  });

  it("should return 0 if expiry time is in the past", () => {
    const now = Date.now();
    const pastTime = now - 5000; // 5 seconds in the past

    jest.setSystemTime(now);

    const remainingTime = getRemainingTime(pastTime);
    expect(remainingTime).toBe(0);
  });

  it("should return 0 if expiry time is null", () => {
    const remainingTime = getRemainingTime(null);
    expect(remainingTime).toBe(0);
  });
});

describe("getDisplayTimeFromSeconds", () => {
  it("should format time correctly for minutes and seconds", () => {
    expect(getDisplayTimeFromSeconds(65)).toBe("00:01:05");
    expect(getDisplayTimeFromSeconds(130)).toBe("00:02:10");
    expect(getDisplayTimeFromSeconds(59)).toBe("00:00:59");
  });

  it("should handle single digit seconds", () => {
    expect(getDisplayTimeFromSeconds(61)).toBe("00:01:01");
    expect(getDisplayTimeFromSeconds(70)).toBe("00:01:10");
  });

  it("should handle zero seconds", () => {
    expect(getDisplayTimeFromSeconds(0)).toBe("00:00:00");
  });

  it("should handle large numbers of seconds", () => {
    expect(getDisplayTimeFromSeconds(3600)).toBe("01:00:00");
    expect(getDisplayTimeFromSeconds(3661)).toBe("01:01:01");
  });

  it("should handle negative numbers", () => {
    expect(getDisplayTimeFromSeconds(-60)).toBe("00:00:00");
    expect(getDisplayTimeFromSeconds(-1)).toBe("00:00:00");
  });
});
