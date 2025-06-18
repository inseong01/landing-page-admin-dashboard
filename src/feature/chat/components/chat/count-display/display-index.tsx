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
      <span className="text-[#7c7c7c] dark:text-[#A7A7A7]">{category}</span>
      <span className="text-[#000] dark:text-white">
        {count} {unit}
      </span>
    </div>
  );
}
