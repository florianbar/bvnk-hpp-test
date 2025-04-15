"use server";

import { PayinPageProps } from "@/types/payin";
import QuotePageHandler from "@/components/quote-page-handler";
import Container from "@/components/ui/container";
import QuoteExpired from "@/components/quote-expired";
import { getPayinRoutes } from "@/utils/routes";

export default async function ExpiredQuotePage({ params }: PayinPageProps) {
  const { uuid } = await params;

  return (
    <QuotePageHandler currentUrl={getPayinRoutes.expired(uuid)} uuid={uuid}>
      {() => (
        <Container>
          <QuoteExpired />
        </Container>
      )}
    </QuotePageHandler>
  );
}
