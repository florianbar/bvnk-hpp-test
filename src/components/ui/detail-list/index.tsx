type Detail = {
  key: string | React.ReactElement;
  value: string | React.ReactElement;
};

interface DetailListProps {
  data: Detail[];
  showBottomBorder?: boolean;
}

export default function DetailList({
  data,
  showBottomBorder = true,
}: DetailListProps) {
  return (
    <div
      className={`w-full my-3 bg-white border-bvnk-light ${
        showBottomBorder ? "border-b" : ""
      }`}
    >
      {data.map(({ key, value }: Detail, index: number) => (
        <div
          key={index}
          className="flex justify-between items-center border-t border-bvnk-light py-4"
        >
          <div className="text-bvnk-gray">{key}</div>
          <div className="text-bvnk-black font-medium">{value}</div>
        </div>
      ))}
    </div>
  );
}
