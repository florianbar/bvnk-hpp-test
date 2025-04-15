interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="container max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl">
      {children}
    </div>
  );
}
