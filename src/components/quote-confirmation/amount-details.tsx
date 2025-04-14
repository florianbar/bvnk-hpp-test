import { AmountDetailsProps } from "./types";

export default function AmountDetails({
  amount,
  currency,
  acceptanceExpiryDate,
}: AmountDetailsProps) {
  function handleConfirm() {
    console.log("confirm");
  }

  return (
    <>
      <p>
        Amount due: {amount} {currency}
      </p>
      <p>Quoted price expires in: {acceptanceExpiryDate}</p>

      <button className="mt-3" type="button" onClick={handleConfirm}>
        Confirm
      </button>
    </>
  );
}
