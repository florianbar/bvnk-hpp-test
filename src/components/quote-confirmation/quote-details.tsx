interface QuoteDetailsProps {
  merchantDisplayName: string;
  amount: number;
  currency: string;
  reference: string;
}

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
