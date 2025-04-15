"use client";

import { useEffect, useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import * as api from "@/utils/api";
import { PayinSummaryResponse } from "@/types/payin";

interface QuoteAmountDetails {
  amount: number;
  currency: string;
  acceptanceExpiryDate: number;
}

interface UseQuoteConfirmationResult {
  quoteAmountDetails: QuoteAmountDetails | null;
  updateQuote: UseMutationResult<PayinSummaryResponse, Error, string>;
  refreshQuote: UseMutationResult<PayinSummaryResponse, Error, void>;
  acceptQuote: UseMutationResult<PayinSummaryResponse, Error, void>;
}

export default function useQuoteConfirmation(
  uuid: string
): UseQuoteConfirmationResult {
  function updateQuoteAmountDetails(data: PayinSummaryResponse) {
    setQuoteAmountDetails({
      amount: data.paidCurrency.amount,
      currency: data.paidCurrency.currency ?? "",
      acceptanceExpiryDate: data.acceptanceExpiryDate,
    });
  }

  const updateQuote = useMutation({
    mutationFn: (currency: string) => api.updateQuote(uuid, currency),
    onSuccess: updateQuoteAmountDetails,
  });

  const refreshQuote = useMutation({
    mutationFn: () => api.refreshQuote(uuid),
    onSuccess: updateQuoteAmountDetails,
  });

  const acceptQuote = useMutation({
    mutationFn: () => api.acceptQuote(uuid),
  });

  const [quoteAmountDetails, setQuoteAmountDetails] =
    useState<QuoteAmountDetails | null>(null);

  useEffect(() => {
    const now = Date.now();

    if (quoteAmountDetails && quoteAmountDetails.acceptanceExpiryDate > now) {
      const difference = quoteAmountDetails.acceptanceExpiryDate - now;
      const delay = Math.floor(difference);

      setTimeout(() => {
        refreshQuote.mutate();
      }, delay);
    }
  }, [quoteAmountDetails, refreshQuote]);

  return {
    quoteAmountDetails,
    updateQuote,
    refreshQuote,
    acceptQuote,
  };
}
