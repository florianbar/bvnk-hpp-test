"use server";

import { PayinPageProps } from "@/types/payin";
import QuoteConfirmation from "@/components/quote-confirmation";
import Container from "@/components/ui/container";
import { fetchQuote } from "@/utils/api";

export default async function AcceptQuotePage({ params }: PayinPageProps) {
  const { uuid } = await params;
  const quote = await fetchQuote(uuid);

  return (
    <Container title={quote.merchantDisplayName}>
      <QuoteConfirmation uuid={uuid} initialQuote={quote} />
    </Container>
  );
}
