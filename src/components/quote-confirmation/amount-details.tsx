"use client";

import useExpiryCountdown from "@/hooks/useExpiryCountdown";
import DetailList from "../ui/detail-list";
import Button from "@/components/ui/button";

interface AmountDetailsProps {
  amount: number;
  currency: string;
  acceptanceExpiryDate: number;
  isUpdating: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function AmountDetails(props: AmountDetailsProps) {
  const {
    amount,
    currency,
    acceptanceExpiryDate,
    // isUpdating,
    onSubmit,
    isSubmitting,
  } = props;

  const { timeRemaining } = useExpiryCountdown(acceptanceExpiryDate);

  function handleConfirm() {
    onSubmit();
  }

  return (
    <>
      <div className="mb-6">
        <DetailList
          data={[
            {
              key: "Amount due",
              value: `${amount} ${currency}`,
            },
            {
              key: "Quoted price expires in",
              value: `${Math.floor(timeRemaining / 1000)}`,
            },
          ]}
        />
      </div>

      <Button onClick={handleConfirm} disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Confirm"}
      </Button>
    </>
  );
}
