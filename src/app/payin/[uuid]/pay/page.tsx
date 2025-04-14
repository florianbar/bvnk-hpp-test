import { PayinPageProps } from "@/types/payin";

export default function PayQuotePage({ params }: PayinPageProps) {
  const { uuid } = params;

  return (
    <div>
      <h1>Pay Quote</h1>
      <p>Quote ID: {uuid}</p>
    </div>
  );
}
