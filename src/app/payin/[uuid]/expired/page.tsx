import { PayinPageProps } from "@/types/payin";

export default function ExpiredQuotePage({ params }: PayinPageProps) {
  const { uuid } = params;

  return (
    <div>
      <h1>Quote Expired</h1>
      <p>Quote ID: {uuid}</p>
    </div>
  );
}
