"use client";

import { useQuery, useMutation } from "@tanstack/react-query";

import * as api from "@/utils/api";
import { QuoteConfirmationProps } from "./types";
import QuoteDetails from "./quote-details";
import PayInSelect from "./pay-in-select";
import AmountDetails from "./amount-details";

export default function QuoteConfirmation({ uuid }: QuoteConfirmationProps) {
  const {
    data: quoteData,
    isPending: quoteIsPending,
    isError: quoteHasError,
    error: quoteError,
  } = useQuery({
    queryKey: ["quote", uuid],
    queryFn: () => api.fetchQuote(uuid),
    staleTime: Infinity,
  });

  const {
    mutate: updateQuote,
    data: updatedData,
    isPending: updateIsPending,
    isError: updateHasError,
    error: updateError,
  } = useMutation({
    mutationFn: (currency: string) => api.updateQuote(uuid, currency),
  });

  function handleCurrencyChange(currency: string) {
    updateQuote(currency);
  }

  return (
    <>
      <div className="my-6">
        {quoteIsPending && <p>Loading quote...</p>}

        {quoteHasError && (
          <p className="text-red-500">Error: {quoteError.message}</p>
        )}

        {quoteData && (
          <QuoteDetails
            merchantDisplayName={quoteData.merchantDisplayName}
            amount={quoteData.displayCurrency.amount}
            currency={quoteData.displayCurrency.currency}
            reference={quoteData.reference}
          />
        )}
      </div>

      <PayInSelect onChange={handleCurrencyChange} />

      <div className="my-6">
        {updateIsPending && <p>Loading updates...</p>}

        {updateHasError && (
          <p className="text-red-500">Error: {updateError.message}</p>
        )}

        {updatedData && (
          <AmountDetails
            amount={updatedData.paidCurrency.amount}
            currency={updatedData.paidCurrency.currency ?? ""}
            acceptanceExpiryDate={updatedData.acceptanceExpiryDate}
          />
        )}
      </div>
    </>
  );
}
