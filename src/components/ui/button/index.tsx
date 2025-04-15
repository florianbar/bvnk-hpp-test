interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { children, onClick, type = "button", disabled } = props;

  return (
    <button
      type={type}
      className={`w-full px-4 py-2.5 rounded-md bg-bvnk-primary text-white ${
        disabled ? "opacity-50" : "hover:opacity-90 cursor-pointer"
      }`}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
}
