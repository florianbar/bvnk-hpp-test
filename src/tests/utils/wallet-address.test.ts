import { getMaskedWalletAddress } from "@/utils/wallet-address";

describe("getMaskedWalletAddress", () => {
  it("should mask the middle portion of a wallet address", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    const masked = getMaskedWalletAddress(address);
    expect(masked).toBe("0x12345...45678");
  });

  it("should handle empty string", () => {
    const masked = getMaskedWalletAddress("");
    expect(masked).toBe("");
  });
});
