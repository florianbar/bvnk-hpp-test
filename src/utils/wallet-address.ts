export function getMaskedWalletAddress(walletAddress: string) {
  if (!walletAddress) {
    return "";
  }
  return `${walletAddress.slice(0, 7)}...${walletAddress.slice(-5)}`;
}
