"use server";

import { PayinPageProps } from "@/types/payin";
import QuotePay from "@/components/quote-pay";
import Container from "@/components/ui/container";
import { CURRENCY_LABELS } from "@/constants/payin";
import { fetchQuote } from "@/utils/api";

export default async function PayQuotePage({ params }: PayinPageProps) {
  const { uuid } = await params;
  const quote = await fetchQuote(uuid);

  return (
    <Container
      title={`Pay with ${
        CURRENCY_LABELS[
          quote.paidCurrency.currency as keyof typeof CURRENCY_LABELS
        ]
      }`}
    >
      <QuotePay uuid={uuid} quote={quote} />
    </Container>
  );
}
