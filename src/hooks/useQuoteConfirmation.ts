"use client";

import { useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import * as api from "@/utils/api";
import { PayinSummaryResponse } from "@/types/payin";

export interface QuoteDetails {
  amount: number;
  currency: string;
  acceptanceExpiryDate: number;
}

interface UseQuoteConfirmationResult {
  quoteDetails: QuoteDetails | null;
  updateQuote: UseMutationResult<PayinSummaryResponse, Error, string>;
  refreshQuote: UseMutationResult<PayinSummaryResponse, Error, void>;
  acceptQuote: UseMutationResult<PayinSummaryResponse, Error, void>;
}

export default function useQuoteConfirmation(
  uuid: string
): UseQuoteConfirmationResult {
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);

  function updateQuoteDetails(data: PayinSummaryResponse) {
    setQuoteDetails({
      amount: data.paidCurrency.amount,
      currency: data.paidCurrency.currency ?? "",
      acceptanceExpiryDate: data.acceptanceExpiryDate,
    });
  }

  function clearQuoteDetails() {
    setQuoteDetails(null);
  }

  const updateQuote = useMutation({
    mutationFn: (currency: string) => api.updateQuote(uuid, currency),
    onMutate: clearQuoteDetails,
    onSuccess: updateQuoteDetails,
  });

  const refreshQuote = useMutation({
    mutationFn: () => api.refreshQuote(uuid),
    onMutate: clearQuoteDetails,
    onSuccess: updateQuoteDetails,
  });

  const acceptQuote = useMutation({
    mutationFn: () => api.acceptQuote(uuid),
  });

  return {
    quoteDetails,
    updateQuote,
    refreshQuote,
    acceptQuote,
  };
}
