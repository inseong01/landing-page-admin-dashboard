export default function NoneItemMessage({ text }: { text: string }) {
  return (
    <li className="cursor-default p-3 pr-7 pl-7 text-base text-[#606060]">
      {text}
    </li>
  );
}
