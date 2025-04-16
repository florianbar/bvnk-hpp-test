"use client";

import Button from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import DetailList from "@/components/ui/detail-list";
import CountDown from "@/components/ui/count-down";

interface AmountDetailsProps {
  amount?: number;
  currency?: string;
  acceptanceExpiryDate?: number;
  isUpdating: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function AmountDetails(props: AmountDetailsProps) {
  const {
    amount,
    currency,
    acceptanceExpiryDate,
    isUpdating,
    onSubmit,
    isSubmitting,
  } = props;

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
      </div>

      <Button onClick={handleConfirm} disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Confirm"}
      </Button>
    </>
  );
}
