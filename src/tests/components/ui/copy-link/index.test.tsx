import { render, screen, fireEvent, act } from "@testing-library/react";

import CopyLink from "@/components/ui/copy-link";

describe("CopyLink", () => {
  const mockLink = "https://example.com";

  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    // Mock setTimeout
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders with initial "Copy" text', () => {
    render(<CopyLink link={mockLink} />);
    expect(screen.getByRole("button")).toHaveTextContent("Copy");
  });

  it('changes text to "Copied" when clicked and back to "Copy" after 2 seconds', async () => {
    render(<CopyLink link={mockLink} />);
    const button = screen.getByRole("button");

    // Click the button
    fireEvent.click(button);

    // Verify "Copied" state
    expect(button).toHaveTextContent("Copied");
    expect(button).toBeDisabled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockLink);

    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Verify returned to "Copy" state
    expect(button).toHaveTextContent("Copy");
    expect(button).not.toBeDisabled();
  });

  it("handles missing clipboard API gracefully", () => {
    // Remove clipboard API
    Object.assign(navigator, { clipboard: undefined });

    render(<CopyLink link={mockLink} />);
    const button = screen.getByRole("button");

    // Click should still work without errors
    fireEvent.click(button);
    expect(button).toHaveTextContent("Copied");
  });

  it('is disabled while in "Copied" state', () => {
    render(<CopyLink link={mockLink} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(button).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(button).not.toBeDisabled();
  });
});
