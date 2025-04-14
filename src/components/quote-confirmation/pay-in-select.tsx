"use client";

import { useState } from "react";

import { CURRENCIES_MOCK } from "@/data/payin";

interface PayInSelectProps {
  onChange: (currency: string) => void;
}

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
        <option value="" disabled>
          Select Currency
        </option>

        {CURRENCIES_MOCK.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {currency.label}
          </option>
        ))}
      </select>
    </>
  );
}
