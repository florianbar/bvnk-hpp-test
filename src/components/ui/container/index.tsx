interface ContainerProps {
  title?: string;
  children: React.ReactNode;
}

export default function Container({ title, children }: ContainerProps) {
  return (
    <div className="container max-w-xl mx-auto mt-20 p-7 bg-white rounded-xl">
      {title && (
        <h2 className="text-center text-2xl font-medium mb-1.5">{title}</h2>
      )}
      {children}
    </div>
  );
}
