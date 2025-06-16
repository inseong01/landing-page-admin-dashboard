export default function CountItemDisplay({
  category,
  count,
  unit,
}: {
  category: string;
  count: number;
  unit: string;
}) {
  return (
    <div className="flex min-w-[230px] cursor-default items-center gap-16 text-lg">
      <span className="text-[#7c7c7c]">{category}</span>
      <span className="text-[#000]">
        {count} {unit}
      </span>
    </div>
  );
}
