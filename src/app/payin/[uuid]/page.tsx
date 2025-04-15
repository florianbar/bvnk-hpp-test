"use server";

import { PayinPageProps, PayinSummaryResponse } from "@/types/payin";
import QuotePageHandler from "@/components/quote-page-handler";
import QuoteConfirmation from "@/components/quote-confirmation";

export default async function AcceptQuotePage({ params }: PayinPageProps) {
  const { uuid } = await params;

  return (
    <QuotePageHandler currentUrl={`/payin/${uuid}`} uuid={uuid}>
      {(quote: PayinSummaryResponse) => (
        <QuoteConfirmation uuid={uuid} initialQuote={quote} />
      )}
    </QuotePageHandler>
  );
}
