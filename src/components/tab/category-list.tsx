import { useAtomValue } from "jotai";
import ICON_MOVE_WINDOW from "./../../assets/icon-move-window-light.svg";
import { categoryAtom } from "../../util/store/atom/global";

export default function CategoryList({
  icon_src,
  icon_alt,
  listTitle,
  url,
  hasURL,
  hasAlert,
  onClick,
}: {
  icon_src: string;
  icon_alt: string;
  listTitle: string;
  url?: string;
  hasURL: boolean;
  hasAlert: boolean;
  onClick?: () => void;
}) {
  const cateogry = useAtomValue(categoryAtom);

  return (
    <li
      className={`categoryPd flex ${cateogry === listTitle ? "bg-[#e6e6e6]" : ""} ${url ? "cursor-default" : "cursor-pointer"} items-center justify-between hover:bg-[#e6e6e6]`}
      onClick={onClick}
    >
      <div className="flex items-center gap-7">
        <div className="flex h-10 w-10">
          <img src={icon_src} alt={icon_alt} />
        </div>

        <div className="flex items-center justify-center gap-3 text-xl font-bold text-[#7D7D7D]">
          <span>{listTitle}</span>

          {hasAlert && (
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#E83939]"></span>
          )}
        </div>
      </div>

      {hasURL && (
        <a className="flex p-1.5" href={url} target="blank">
          <img
            src={ICON_MOVE_WINDOW}
            alt="새로운 창 열기"
            className="h-[20px] w-[20px]"
          />
        </a>
      )}
    </li>
  );
}
