"use server";

import { PayinPageProps, PayinSummaryResponse } from "@/types/payin";
import QuotePageHandler from "@/components/quote-page-handler";
import QuoteConfirmation from "@/components/quote-confirmation";
import Container from "@/components/ui/container";
import { getPayinRoutes } from "@/utils/routes";

export default async function AcceptQuotePage({ params }: PayinPageProps) {
  const { uuid } = await params;

  return (
    <QuotePageHandler currentUrl={getPayinRoutes.confirm(uuid)} uuid={uuid}>
      {(quote: PayinSummaryResponse) => (
        <Container title={quote.merchantDisplayName}>
          <QuoteConfirmation uuid={uuid} initialQuote={quote} />
        </Container>
      )}
    </QuotePageHandler>
  );
}
