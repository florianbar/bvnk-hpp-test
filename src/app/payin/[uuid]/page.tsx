import { PayinPageProps } from "@/types/payin";
import QuoteConfirmation from "@/components/quote-confirmation";

export default function AcceptQuotePage({ params }: PayinPageProps) {
  const { uuid } = params;

  return <QuoteConfirmation uuid={uuid} />;
}
