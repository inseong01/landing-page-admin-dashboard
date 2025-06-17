import type { Dispatch, SetStateAction } from "react";

import ICON_LIST_DOWN from "./../../assets/icon-list-down.svg";

export default function CategoryTitle({
  title,
  isExpanded,
  setIsExpanded,
}: {
  title: string;
  isExpanded?: boolean;
  setIsExpanded?: Dispatch<SetStateAction<boolean>>;
}) {
  function onClickCategory() {
    if (setIsExpanded) {
      return setIsExpanded((prev) => !prev);
    }
  }

  return (
    <button
      type="button"
      className="categoryPd flex w-full cursor-pointer items-center justify-between disabled:cursor-default"
      onClick={onClickCategory}
      disabled={isExpanded === undefined}
    >
      <span className="text-xl font-bold text-[#7D7D7D] max-lg:text-lg">
        {title}
      </span>

      {isExpanded !== undefined && (
        <div className="flex p-1.5">
          <img
            src={ICON_LIST_DOWN}
            alt="펼치기"
            className={`h-[20px] w-[20px] max-lg:h-[18px] max-lg:w-[18px] ${isExpanded ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      )}
    </button>
  );
}
