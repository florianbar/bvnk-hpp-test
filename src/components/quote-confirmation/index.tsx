"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import QuoteDetails from "./quote-details";
import PayInSelect from "./pay-in-select";
import AmountDetails from "./amount-details";
import { PayinSummaryResponse } from "@/types/payin";
import ErrorText from "@/components/ui/error-text";
import useExpiry from "@/hooks/useExpiry";
import { getPayinRoutes } from "@/utils/routes";
import * as api from "@/utils/api";
import Button from "@/components/ui/button";

interface QuoteConfirmationProps {
  uuid: string;
  initialQuote: PayinSummaryResponse;
}

export default function QuoteConfirmation({
  uuid,
  initialQuote,
}: QuoteConfirmationProps) {
  const router = useRouter();

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const {
    mutate: updateQuote,
    data: updateQuoteData,
    isPending: updateQuoteIsPending,
    isError: updateQuoteHasError,
    error: updateQuoteError,
  } = useMutation({
    mutationFn: (currency: string) => api.updateQuote(uuid, currency),
  });

  const {
    mutate: acceptQuote,
    isPending: acceptQuoteIsPending,
    isSuccess: acceptQuoteIsSuccess,
    isError: acceptQuoteHasError,
    error: acceptQuoteError,
  } = useMutation({
    mutationFn: () => api.acceptQuote(uuid),
  });

  // Redirect to expired page if quote has expired
  useExpiry(initialQuote.expiryDate, () => {
    router.push(getPayinRoutes.expired(uuid));
  });

  // Refresh quote if acceptance has expired
  useExpiry(updateQuoteData?.acceptanceExpiryDate || null, () => {
    if (!selectedCurrency) return;
    updateQuote(selectedCurrency);
  });

  // Redirect to payment page if quote has been accepted
  useEffect(() => {
    if (acceptQuoteIsSuccess) {
      router.push(getPayinRoutes.pay(uuid));
    }
  }, [acceptQuoteIsSuccess, router, uuid]);

  function handleCurrencyChange(currency: string) {
    setSelectedCurrency(currency);
    updateQuote(currency);
  }

  function handleQuoteConfirmation() {
    acceptQuote();
  }

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

      {selectedCurrency && !updateQuoteHasError && (
        <div className="mt-6">
          <div className="mb-6">
            <AmountDetails
              amount={updateQuoteData?.paidCurrency.amount}
              currency={updateQuoteData?.paidCurrency.currency || ""}
              acceptanceExpiryDate={updateQuoteData?.acceptanceExpiryDate}
              isUpdating={updateQuoteIsPending}
            />
          </div>

          <Button
            onClick={handleQuoteConfirmation}
            disabled={acceptQuoteIsPending}
          >
            {acceptQuoteIsPending ? "Processing..." : "Confirm"}
          </Button>
        </div>
      )}

      {updateQuoteHasError && (
        <>
          <div className="my-3">
            <ErrorText>{updateQuoteError.message}</ErrorText>
          </div>

          {selectedCurrency && (
            <Button
              onClick={() => updateQuote(selectedCurrency)}
              disabled={updateQuoteIsPending}
            >
              {updateQuoteIsPending ? "Processing..." : "Retry"}
            </Button>
          )}
        </>
      )}

      {acceptQuoteHasError && (
        <div className="mt-3">
          <ErrorText>{acceptQuoteError.message}</ErrorText>
        </div>
      )}
    </>
  );
}
