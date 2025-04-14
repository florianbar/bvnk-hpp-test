import { QuoteDetailsProps } from "./types";

export default function QuoteDetails({
  merchantDisplayName,
  amount,
  currency,
  reference,
}: QuoteDetailsProps) {
  return (
    <>
      <p>{merchantDisplayName}</p>
      <p>
        {amount} {currency}
      </p>
      <p>For reference number: {reference}</p>
    </>
  );
}
