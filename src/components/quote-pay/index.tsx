"use client";

import { PayinSummaryResponse } from "@/types/payin";
import CopyLink from "../ui/copy-link";
import { getMaskedWalletAddress } from "@/utils/wallet-address";
import DetailList from "../ui/detail-list";

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
      <p className="mt-8 mb-10 px-[4rem] text-center">
        To complete this payment send the amount due to the {currency} address
        provided below.
      </p>

      <DetailList
        data={[
          {
            key: "Amount due",
            value: (
              <div className="space-x-3">
                <span>{amountDue}</span> <CopyLink link={amountDue} />
              </div>
            ),
          },
          {
            key: `${currency} address`,
            value: (
              <div className="space-x-3">
                <span>{getMaskedWalletAddress(address)}</span>{" "}
                <CopyLink link={address} />
              </div>
            ),
          },
        ]}
        showBottomBorder={false}
      />

      <div className="my-12">
        QR code
        {address}
      </div>

      <DetailList
        data={[{ key: "Time left to pay", value: `${expiryDate}` }]}
      />
    </>
  );
}
