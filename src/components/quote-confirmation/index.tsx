"use client";

import QuoteDetails from "./quote-details";
import PayInSelect from "./pay-in-select";
import AmountDetails from "./amount-details";
import useQuoteConfirmation from "@/hooks/useQuoteConfirmation";

interface QuoteConfirmationProps {
  uuid: string;
}

export default function QuoteConfirmation({ uuid }: QuoteConfirmationProps) {
  const {
    quoteDetails,
    quoteAmountDetails,
    fetchQuote,
    updateQuote,
    refreshQuote,
    acceptQuote,
  } = useQuoteConfirmation(uuid);

  function handleCurrencyChange(currency: string) {
    updateQuote.mutate(currency);
  }

  function handleQuoteConfirmation() {
    acceptQuote.mutate();
  }

  return (
    <>
      <div className="my-6">
        {fetchQuote.isPending && <p>Fetching Quote...</p>}

        {fetchQuote.isError && (
          <p className="text-red-500">
            Fetching Quote Error: {fetchQuote.error.message}
          </p>
        )}

        {quoteDetails && (
          <QuoteDetails
            merchantDisplayName={quoteDetails.merchantDisplayName}
            amount={quoteDetails.amount}
            currency={quoteDetails.currency}
            reference={quoteDetails.reference}
          />
        )}
      </div>

      <PayInSelect onChange={handleCurrencyChange} />

      <div className="my-6">
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
