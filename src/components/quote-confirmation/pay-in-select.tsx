"use client";

import { CURRENCIES_MOCK } from "@/data/payin";
import Select from "@/components/ui/select";

interface PayInSelectProps {
  onChange: (currency: string) => void;
}

export default function PayInSelect({ onChange }: PayInSelectProps) {
  return (
    <>
      <label className="block mb-1 font-medium">Pay with</label>
      <Select
        options={CURRENCIES_MOCK}
        placeholder="Select Currency"
        onChange={onChange}
      />
    </>
  );
}
