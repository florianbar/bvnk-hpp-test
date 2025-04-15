"use server";

import { PayinPageProps, PayinSummaryResponse } from "@/types/payin";
import QuotePageHandler from "@/components/quote-page-handler";
import QuotePay from "@/components/quote-pay";

export default async function PayQuotePage({ params }: PayinPageProps) {
  const { uuid } = await params;

  return (
    <QuotePageHandler currentUrl={`/payin/${uuid}/pay`} uuid={uuid}>
      {(quote: PayinSummaryResponse) => <QuotePay quote={quote} />}
    </QuotePageHandler>
  );
}
