import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

interface SelectProps {
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Select(props: SelectProps) {
  const { options, value = "", placeholder, onChange } = props;

  const [selectedOption, setSelectedOption] = useState<string | null>(value);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  }

  return (
    <select
      className="border border-gray-200 rounded-md px-3 py-5 w-full text-[15px] font-medium"
      onChange={handleChange}
      value={selectedOption || ""}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
