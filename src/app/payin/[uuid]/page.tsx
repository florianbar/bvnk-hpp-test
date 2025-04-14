import { PayinPageProps } from "@/types/payin";

export default function AcceptQuotePage({ params }: PayinPageProps) {
  const { uuid } = params;

  return (
    <div>
      <h1>Accept Quote</h1>
      <p>Quote ID: {uuid}</p>
    </div>
  );
}
