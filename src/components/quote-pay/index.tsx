"use client";

import { PayinSummaryResponse } from "@/types/payin";
import CopyLink from "../ui/copy-link";
import { getMaskedWalletAddress } from "@/utils/wallet-address";

interface QuotePayProps {
  quote: PayinSummaryResponse;
}

export default function QuotePay({ quote }: QuotePayProps) {
  const {
    address: { address },
    paidCurrency: { amount, currency },
    expiryDate,
  } = quote;

  const amountDue = `${amount} ${currency}`;

  return (
    <>
      <h1>Pay with {currency}</h1>
      <p className="my-3">
        To complete this payment send the amount due to the {currency} address
        provided below.
      </p>
      <div>
        Amount due: {amountDue} <CopyLink link={amountDue} />
      </div>
      <div>
        {currency} address: {getMaskedWalletAddress(address)}{" "}
        <CopyLink link={address} />
      </div>
      <div className="my-3">
        QR code
        {address}
      </div>
      <div>
        Time left to pay
        {expiryDate}
      </div>
    </>
  );
}
