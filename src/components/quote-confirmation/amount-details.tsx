"use client";

import Button from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import DetailList from "@/components/ui/detail-list";
import CountDown from "@/components/ui/count-down";
import { QuoteDetails } from "@/hooks/useQuoteConfirmation";

interface AmountDetailsProps {
  details: QuoteDetails | null;
  isUpdating: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function AmountDetails(props: AmountDetailsProps) {
  const { details, isUpdating, onSubmit, isSubmitting } = props;

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
                `${details?.amount} ${details?.currency}`
              ),
            },
            {
              key: "Quoted price expires in",
              value: isUpdating ? (
                <Spinner />
              ) : (
                <CountDown expiryDate={details?.acceptanceExpiryDate || 0} />
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
