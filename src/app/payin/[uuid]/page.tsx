import { redirect } from "next/navigation";

import { PayinPageProps } from "@/types/payin";
import QuoteConfirmation from "@/components/quote-confirmation";
import { fetchQuote } from "@/utils/api";

export default async function AcceptQuotePage({ params }: PayinPageProps) {
  const { uuid } = params;

  let quote;
  let quoteStatus;
  let quoteExpiryDate;
  let hasError = false;

  try {
    quote = await fetchQuote(uuid);
    quoteExpiryDate = quote.expiryDate;
  } catch (error: unknown) {
    console.log("error: ", error);
    hasError = true;
  }

  if (hasError) {
    // TODO: make error page
    return <div>Error fetching quote</div>;
  }

  if (quoteExpiryDate && quoteExpiryDate <= Date.now()) {
    return redirect(`/payin/${uuid}/expired`);
  }

  if (quoteStatus) {
    // TODO: redirect to pay page if status is not pending
  }

  return <QuoteConfirmation uuid={uuid} initialQuote={quote} />;
}
