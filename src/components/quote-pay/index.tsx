"use client";

import { useRouter } from "next/navigation";

import { PayinSummaryResponse } from "@/types/payin";
import CopyLink from "@/components/ui/copy-link";
import { getMaskedWalletAddress } from "@/utils/wallet-address";
import DetailList from "@/components/ui/detail-list";
import useExpiry from "@/hooks/useExpiry";
import { getPayinRoutes } from "@/utils/routes";
import CountDown from "@/components/ui/count-down";

interface QuotePayProps {
  uuid: string;
  quote: PayinSummaryResponse;
}

export default function QuotePay({ uuid, quote }: QuotePayProps) {
  const {
    address: { address },
    paidCurrency: { amount, currency },
    expiryDate,
  } = quote;

  const router = useRouter();

  // Redirect to expired page if quote has expired
  useExpiry(quote.expiryDate, () => {
    router.push(getPayinRoutes.expired(uuid));
  });

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

      <div className="-mb-3">
        <DetailList
          data={[
            {
              key: "Time left to pay",
              value: <CountDown expiryDate={expiryDate} />,
            },
          ]}
        />
      </div>
    </>
  );
}
