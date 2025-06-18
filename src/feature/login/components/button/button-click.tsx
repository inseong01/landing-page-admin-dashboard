export default function ClickButton({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer text-right text-xs text-[#7D7D7D] hover:text-[#434343] dark:text-[#a3a3a3] dark:hover:text-[#D9D9D9]"
    >
      {text}
    </button>
  );
}
