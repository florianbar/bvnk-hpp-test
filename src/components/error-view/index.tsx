import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface ErrorViewProps {
  title: string;
  children: string | React.ReactNode;
}

export default function ErrorView({ title, children }: ErrorViewProps) {
  return (
    <div className="text-center p-[3rem]">
      <ExclamationCircleIcon className="size-[4rem] mx-auto text-bvnk-danger mb-4" />
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <p className="text-[15px]">{children}</p>
    </div>
  );
}
