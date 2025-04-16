"use client";

import useExpiryCountdown from "@/hooks/useExpiryCountdown";
import Button from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import DetailList from "../ui/detail-list";

interface AmountDetailsProps {
  details: {
    amount: number;
    currency: string;
    acceptanceExpiryDate: number;
  };
  isUpdating: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function AmountDetails(props: AmountDetailsProps) {
  const { details, isUpdating, onSubmit, isSubmitting } = props;

  // const { timeRemaining } = useExpiryCountdown(details.acceptanceExpiryDate);
  const { timeRemaining } = useExpiryCountdown(30000);

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
              value: isUpdating ? (
                <Spinner />
              ) : (
                `${details.amount} ${details.currency}`
              ),
            },
            {
              key: "Quoted price expires in",
              value: isUpdating ? (
                <Spinner />
              ) : (
                `${Math.floor(timeRemaining / 1000)}`
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
