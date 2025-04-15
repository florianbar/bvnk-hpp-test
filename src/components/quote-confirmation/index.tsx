"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import QuoteDetails from "./quote-details";
import PayInSelect from "./pay-in-select";
import AmountDetails from "./amount-details";
import useQuoteConfirmation from "@/hooks/useQuoteConfirmation";
import { PayinSummaryResponse } from "@/types/payin";

interface QuoteConfirmationProps {
  uuid: string;
  initialQuote?: PayinSummaryResponse;
}

export default function QuoteConfirmation({
  uuid,
  initialQuote,
}: QuoteConfirmationProps) {
  const router = useRouter();

  const { quoteAmountDetails, updateQuote, refreshQuote, acceptQuote } =
    useQuoteConfirmation(uuid);

  function handleCurrencyChange(currency: string) {
    updateQuote.mutate(currency);
  }

  function handleQuoteConfirmation() {
    acceptQuote.mutate();
  }

  useEffect(() => {
    if (acceptQuote.isSuccess) {
      router.push(`/payin/${uuid}/pay`);
    }
  }, [acceptQuote.isSuccess, router, uuid]);

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
      <div className="mb-6">
        {initialQuote && (
          <QuoteDetails
            amount={initialQuote.displayCurrency.amount}
            currency={initialQuote.displayCurrency.currency}
            reference={initialQuote.reference}
          />
        )}
      </div>

      <PayInSelect onChange={handleCurrencyChange} />

      <div className="mt-6">
        {(updateQuote.isPending || refreshQuote.isPending) && (
          <p>Updating Quote...</p>
        )}

        {updateQuote.isError && (
          <p className="text-red-500">
            Updating Quote Error: {updateQuote.error.message}
          </p>
        )}

        {refreshQuote.isError && (
          <p className="text-red-500">
            Refreshing Quote Error: {refreshQuote.error.message}
          </p>
        )}

        {quoteAmountDetails && (
          <AmountDetails
            amount={quoteAmountDetails.amount}
            currency={quoteAmountDetails.currency}
            acceptanceExpiryDate={quoteAmountDetails.acceptanceExpiryDate}
            isUpdating={updateQuote.isPending || refreshQuote.isPending}
            onSubmit={handleQuoteConfirmation}
            isSubmitting={acceptQuote.isPending}
          />
        )}

        {acceptQuote.isError && (
          <p className="text-red-500">
            Accept Quote Error: {acceptQuote.error?.message}
          </p>
        )}
      </div>
    </>
  );
}
