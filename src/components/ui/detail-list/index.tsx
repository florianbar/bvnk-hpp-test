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
      className={`w-full bg-white border-[#E3E8EE] ${
        showBottomBorder ? "border-b" : ""
      }`}
    >
      {data.map(({ key, value }: Detail, index: number) => (
        <div
          key={index}
          className="flex justify-between border-t border-[#E3E8EE] py-3"
        >
          <div className="text-bvnk-gray">{key}</div>
          <div className="text-bvnk-black">{value}</div>
        </div>
      ))}
    </div>
  );
}
