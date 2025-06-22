export default function MessageCaption({
  description,
}: {
  description: string;
}) {
  return (
    <span className="text-xl font-bold text-[#434343] dark:text-[#D9D9D9]">
      {description}
    </span>
  );
}
