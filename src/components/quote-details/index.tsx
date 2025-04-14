"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchQuote } from "@/utils/api";
import { QuoteDetailsProps } from "./types";

export default function QuoteDetails({ uuid }: QuoteDetailsProps) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["quote", uuid],
    queryFn: () => fetchQuote(uuid),
  });

  return (
    <>
      {isPending && <p>Loading...</p>}

      {isError && <p>Error: {error.message}</p>}

      {data && (
        <div>
          <p>Merchant: {data.merchantDisplayName}</p>
          <p>Amount: {data.displayCurrency.amount}</p>
          <p>Reference: {data.reference}</p>
        </div>
      )}
    </>
  );
}
