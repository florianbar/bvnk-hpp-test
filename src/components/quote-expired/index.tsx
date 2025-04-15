import ErrorView from "@/components/error-view";

export default function QuoteExpired() {
  return (
    <ErrorView title="Payment details expired">
      The payment details for your transaction have expired.
    </ErrorView>
  );
}
