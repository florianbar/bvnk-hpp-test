"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import * as api from "@/utils/api";
import { QuoteConfirmationProps } from "./types";
import QuoteDetails from "./quote-details";
import PayInSelect from "./pay-in-select";
import AmountDetails from "./amount-details";

export default function QuoteConfirmation({ uuid }: QuoteConfirmationProps) {
  const router = useRouter();

  const quote = useQuery({
    queryKey: ["quote", uuid],
    queryFn: () => api.fetchQuote(uuid),
    staleTime: Infinity,
  });

  const update = useMutation({
    mutationFn: (currency: string) => api.updateQuote(uuid, currency),
  });

  const acceptQuote = useMutation({
    mutationFn: () => api.acceptQuote(uuid),
    onSuccess: () => {
      router.push(`/payin/${uuid}/pay`);
    },
  });

  function handleCurrencyChange(currency: string) {
    update.mutate(currency);
  }

  function handleConfirmation() {
    acceptQuote.mutate();
  }

  return (
    <>
      <div className="my-6">
        {quote.isPending && <p>Loading quote...</p>}

        {quote.isError && (
          <p className="text-red-500">Error: {quote.error.message}</p>
        )}

        {quote.data && (
          <QuoteDetails
            merchantDisplayName={quote.data.merchantDisplayName}
            amount={quote.data.displayCurrency.amount}
            currency={quote.data.displayCurrency.currency}
            reference={quote.data.reference}
          />
        )}
      </div>

      <PayInSelect onChange={handleCurrencyChange} />

      <div className="my-6">
        {update.isPending && <p>Loading updates...</p>}

        {update.isError && (
          <p className="text-red-500">Error: {update.error.message}</p>
        )}

        {update.data && (
          <AmountDetails
            amount={update.data.paidCurrency.amount}
            currency={update.data.paidCurrency.currency ?? ""}
            acceptanceExpiryDate={update.data.acceptanceExpiryDate}
            onConfirm={handleConfirmation}
            isLoading={acceptQuote.isPending}
          />
        )}

        {acceptQuote.isError && (
          <p className="text-red-500">Error: {acceptQuote.error?.message}</p>
        )}
      </div>
    </>
  );
}
