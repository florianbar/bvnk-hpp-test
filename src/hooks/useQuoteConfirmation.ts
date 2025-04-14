"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import * as api from "@/utils/api";
import { PayinSummaryResponse } from "@/types/payin";

interface QuoteDetails {
  merchantDisplayName: string;
  amount: number;
  currency: string;
  reference: string;
}

interface QuoteAmountDetails {
  amount: number;
  currency: string;
  acceptanceExpiryDate: number;
}

interface UseQuoteConfirmationResult {
  quoteDetails: QuoteDetails | null;
  quoteAmountDetails: QuoteAmountDetails | null;
  fetchQuote: UseQueryResult<PayinSummaryResponse, Error>;
  updateQuote: UseMutationResult<PayinSummaryResponse, Error, string>;
  refreshQuote: UseMutationResult<PayinSummaryResponse, Error, void>;
  acceptQuote: UseMutationResult<PayinSummaryResponse, Error, void>;
}

export default function useQuoteConfirmation(
  uuid: string
): UseQuoteConfirmationResult {
  const router = useRouter();

  function updateQuoteAmountDetails(data: PayinSummaryResponse) {
    setQuoteAmountDetails({
      amount: data.paidCurrency.amount,
      currency: data.paidCurrency.currency ?? "",
      acceptanceExpiryDate: data.acceptanceExpiryDate,
    });
  }

  const fetchQuote = useQuery({
    queryKey: ["quote", uuid],
    queryFn: () => api.fetchQuote(uuid),
    staleTime: Infinity,
  });

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
    onSuccess: () => {
      router.push(`/payin/${uuid}/pay`);
    },
  });

  const quoteDetails = useMemo<QuoteDetails | null>(() => {
    if (!fetchQuote.data) return null;

    const {
      merchantDisplayName,
      displayCurrency: { amount, currency },
      reference,
    } = fetchQuote.data;

    return {
      merchantDisplayName,
      amount,
      currency,
      reference,
    };
  }, [fetchQuote]);

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
    quoteDetails,
    quoteAmountDetails,
    fetchQuote,
    updateQuote,
    refreshQuote,
    acceptQuote,
  };
}
