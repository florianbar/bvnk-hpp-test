"use server";

import { PayinPageProps, PayinSummaryResponse } from "@/types/payin";
import QuotePageHandler from "@/components/quote-page-handler";

export default async function PayQuotePage({ params }: PayinPageProps) {
  const { uuid } = await params;

  return (
    <QuotePageHandler currentUrl={`/payin/${uuid}/pay`} uuid={uuid}>
      {(quote: PayinSummaryResponse) => (
        <div>
          <h1>Pay Quote {quote.quoteStatus}</h1>
          <p>Quote ID: {uuid}</p>
        </div>
      )}
    </QuotePageHandler>
  );
}
