"use client";

import { useState } from "react";

import { CURRENCIES_MOCK } from "@/data/payin";
import { PayInSelectProps } from "./types";

export default function PayInSelect({ onChange }: PayInSelectProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const currency = event.target.value;
    setSelectedCurrency(currency);
    onChange(currency);
  }

  return (
    <>
      <label>Pay with</label>
      <select onChange={handleChange} value={selectedCurrency || ""}>
        <option value="">Select Currency</option>

        {CURRENCIES_MOCK.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {currency.label}
          </option>
        ))}
      </select>
    </>
  );
}
