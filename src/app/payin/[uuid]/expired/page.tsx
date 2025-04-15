"use server";

import { PayinPageProps } from "@/types/payin";
import QuotePageHandler from "@/components/quote-page-handler";
import Container from "@/components/ui/container";

export default async function ExpiredQuotePage({ params }: PayinPageProps) {
  const { uuid } = await params;

  return (
    <QuotePageHandler currentUrl={`/payin/${uuid}/expired`} uuid={uuid}>
      {() => <Container>Expired</Container>}
    </QuotePageHandler>
  );
}
