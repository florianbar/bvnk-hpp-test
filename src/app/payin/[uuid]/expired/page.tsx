"use server";

import { PayinPageProps, PayinSummaryResponse } from "@/types/payin";
import QuotePageHandler from "@/components/quote-page-handler";
import DetailList from "@/components/ui/detail-list";

export default async function ExpiredQuotePage({ params }: PayinPageProps) {
  const { uuid } = await params;

  return (
    <QuotePageHandler currentUrl={`/payin/${uuid}/expired`} uuid={uuid}>
      {(quote: PayinSummaryResponse) => (
        <div>
          <h1>Pay Quote {quote.quoteStatus}</h1>
          <p>Quote ID: {uuid}</p>
          <DetailList
            data={[
              { key: "Status", value: quote.quoteStatus },
              { key: "Merchant", value: quote.merchantDisplayName },
            ]}
          />
        </div>
      )}
    </QuotePageHandler>
  );
}
