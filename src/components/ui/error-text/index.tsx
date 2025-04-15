interface ErrorTextProps {
  children: string;
}

export default function ErrorText({ children }: ErrorTextProps) {
  return <div className="text-bvnk-danger font-medium">Error: {children}</div>;
}
