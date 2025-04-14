import { PayinPageProps } from "@/types/payin";
import QuoteDetails from "@/components/quote-details";

export default function AcceptQuotePage({ params }: PayinPageProps) {
  const { uuid } = params;

  return (
    <div>
      <h1>Accept Quote</h1>
      <p>Quote ID: {uuid}</p>
      <QuoteDetails uuid={uuid} />
    </div>
  );
}
