"use server";

import Container from "@/components/ui/container";
import QuoteExpired from "@/components/quote-expired";

export default async function ExpiredQuotePage() {
  return (
    <Container>
      <QuoteExpired />
    </Container>
  );
}
