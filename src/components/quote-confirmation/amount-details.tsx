"use client";

import useExpiryCountdown from "@/hooks/useExpiryCountdown";

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
      <p>
        Amount due: {amount} {currency}
      </p>
      <p>Quoted price expires in: {Math.floor(timeRemaining / 1000)}</p>

      <button
        className="mt-3"
        type="button"
        onClick={handleConfirm}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Confirm"}
      </button>
    </>
  );
}
