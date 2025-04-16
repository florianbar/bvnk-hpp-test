"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import QuoteDetails from "./quote-details";
import PayInSelect from "./pay-in-select";
import AmountDetails from "./amount-details";
import useQuoteConfirmation from "@/hooks/useQuoteConfirmation";
import { PayinSummaryResponse } from "@/types/payin";
import ErrorText from "@/components/ui/error-text";
import useExpiry from "@/hooks/useExpiry";
import { getPayinRoutes } from "@/utils/routes";

interface QuoteConfirmationProps {
  uuid: string;
  initialQuote: PayinSummaryResponse;
}

export default function QuoteConfirmation({
  uuid,
  initialQuote,
}: QuoteConfirmationProps) {
  const router = useRouter();

  const { quoteDetails, updateQuote, refreshQuote, acceptQuote } =
    useQuoteConfirmation(uuid);

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  // Redirect to expired page if quote has expired
  useExpiry(initialQuote.expiryDate, () => {
    router.push(getPayinRoutes.expired(uuid));
  });

  // Redirect to payment page if quote has been accepted
  useEffect(() => {
    if (acceptQuote.isSuccess) {
      router.push(getPayinRoutes.pay(uuid));
    }
  }, [acceptQuote.isSuccess, router, uuid]);

  function handleCurrencyChange(currency: string) {
    setSelectedCurrency(currency);
    updateQuote.mutate(currency);
  }

  function handleQuoteConfirmation() {
    acceptQuote.mutate();
  }

  // useEffect(() => {
  //   const now = Date.now();

  //   if (quoteAmountDetails && quoteAmountDetails.acceptanceExpiryDate > now) {
  //     const difference = quoteAmountDetails.acceptanceExpiryDate - now;
  //     const delay = Math.floor(difference);

  //     setTimeout(() => {
  //       refreshQuote.mutate();
  //     }, delay);
  //   }
  // }, [quoteAmountDetails, refreshQuote]);

  return (
    <>
      <div className="mb-7">
        {initialQuote && (
          <QuoteDetails
            amount={initialQuote.displayCurrency.amount}
            currency={initialQuote.displayCurrency.currency}
            reference={initialQuote.reference}
          />
        )}
      </div>

      <PayInSelect onChange={handleCurrencyChange} />

      {selectedCurrency && (
        <div className="mt-6">
          <AmountDetails
            details={quoteDetails}
            isUpdating={updateQuote.isPending || refreshQuote.isPending}
            onSubmit={handleQuoteConfirmation}
            isSubmitting={acceptQuote.isPending}
          />
        </div>
      )}

      {updateQuote.isError && (
        <div className="mt-3">
          <ErrorText>{updateQuote.error.message}</ErrorText>
        </div>
      )}

      {refreshQuote.isError && (
        <div className="mt-3">
          <ErrorText>{refreshQuote.error.message}</ErrorText>
        </div>
      )}

      {acceptQuote.isError && (
        <div className="mt-3">
          <ErrorText>{acceptQuote.error?.message}</ErrorText>
        </div>
      )}
    </>
  );
}
