"use server";

import { PayinPageProps, PayinSummaryResponse } from "@/types/payin";
import QuotePageHandler from "@/components/quote-page-handler";
import QuotePay from "@/components/quote-pay";
import Container from "@/components/ui/container";
import { CURRENCY_LABELS } from "@/constants/payin";

export default async function PayQuotePage({ params }: PayinPageProps) {
  const { uuid } = await params;

  return (
    <QuotePageHandler currentUrl={`/payin/${uuid}/pay`} uuid={uuid}>
      {(quote: PayinSummaryResponse) => (
        <Container
          title={`Pay with ${
            CURRENCY_LABELS[
              quote.paidCurrency.currency as keyof typeof CURRENCY_LABELS
            ]
          }`}
        >
          <QuotePay quote={quote} />
        </Container>
      )}
    </QuotePageHandler>
  );
}
