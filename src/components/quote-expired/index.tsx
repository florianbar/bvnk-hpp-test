import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function QuoteExpired() {
  return (
    <div className="text-center px-[6rem] py-[3rem]">
      <ExclamationCircleIcon className="size-[4rem] mx-auto text-bvnk-danger mb-4" />
      <h2 className="text-2xl font-bold mb-5">Payment details expired</h2>
      <p className="text-[15px]">
        The payment details for your transaction have expired.
      </p>
    </div>
  );
}
