interface QuoteDetailsProps {
  amount: number;
  currency: string;
  reference: string;
}

export default function QuoteDetails({
  amount,
  currency,
  reference,
}: QuoteDetailsProps) {
  return (
    <div className="text-center">
      <div className="mb-6 text-bvnk-black font-bold text-4xl">
        {amount} <span className="text-2xl">{currency}</span>
      </div>
      <p>
        For reference number:{" "}
        <span className="text-bvnk-black font-medium">{reference}</span>
      </p>
    </div>
  );
}
