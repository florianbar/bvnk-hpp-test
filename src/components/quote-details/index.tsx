"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import * as api from "@/utils/api";
import { CURRENCIES_MOCK } from "@/data/payin";
import { QuoteDetailsProps } from "./types";

export default function QuoteDetails({ uuid }: QuoteDetailsProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const {
    data: quoteData,
    isPending: quoteIsPending,
    isError: quoteHasError,
    error: quoteError,
    refetch: refetchQuote,
  } = useQuery({
    queryKey: ["quote", uuid],
    queryFn: () => api.fetchQuote(uuid),
  });

  const {
    mutate: updateQuote,
    isPending: updateIsPending,
    isError: updateHasError,
    error: updateError,
  } = useMutation({
    mutationFn: (currency: string) => api.updateQuote(uuid, currency),
    onSuccess: () => {
      refetchQuote();
    },
  });

  function handleCurrencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const currency = event.target.value;
    setSelectedCurrency(currency);
    updateQuote(currency);
  }

  return (
    <>
      {(quoteIsPending || updateIsPending) && <p>Loading...</p>}

      {quoteHasError && (
        <p className="text-red-500">Error: {quoteError.message}</p>
      )}
      {updateHasError && (
        <p className="text-red-500">Error: {updateError.message}</p>
      )}

      {quoteData && (
        <div>
          <p>Merchant: {quoteData.merchantDisplayName}</p>
          <p>Amount: {quoteData.displayCurrency.amount}</p>
          <p>Reference: {quoteData.reference}</p>
        </div>
      )}

      <label>Pay with</label>
      <select onChange={handleCurrencyChange} value={selectedCurrency || ""}>
        <option value="">Select Currency</option>
        {CURRENCIES_MOCK.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {currency.label}
          </option>
        ))}
      </select>
    </>
  );
}
