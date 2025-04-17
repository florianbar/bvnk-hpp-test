"use client";

import Spinner from "@/components/ui/spinner";
import DetailList from "@/components/ui/detail-list";
import CountDown from "@/components/ui/count-down";

interface AmountDetailsProps {
  amount?: number;
  currency?: string;
  acceptanceExpiryDate?: number;
  isUpdating: boolean;
}

export default function AmountDetails(props: AmountDetailsProps) {
  const { amount, currency, acceptanceExpiryDate, isUpdating } = props;

  return (
    <DetailList
      data={[
        {
          key: "Amount due",
          value: isUpdating ? <Spinner /> : `${amount} ${currency}`,
        },
        {
          key: "Quoted price expires in",
          value: isUpdating ? (
            <Spinner />
          ) : (
            <CountDown expiryDate={acceptanceExpiryDate || 0} />
          ),
        },
      ]}
    />
  );
}
