import type { MouseEvent } from "react";

export default function SubmitButton({
  disabled,
  onClick,
  text,
}: {
  disabled: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  text: string;
}) {
  return (
    <button
      type="submit"
      className="flex-1 cursor-pointer rounded-sm border-[1px] border-[#5A80A5] bg-[#5A80A5] p-3 text-lg text-white hover:bg-[#486684] hover:text-[#ddd] dark:border-[#575757] dark:bg-[#575757] dark:hover:border-[#474747] dark:hover:bg-[#474747] dark:hover:text-[#ddd]"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
