import { type ReactNode } from "react";

import ICON_PROFILE from "./../../../assets/icon-profile.svg";

export default function MessageBox({
  writer,
  children,
}: {
  writer: string;
  children: ReactNode | string;
}) {
  return (
    <div
      className={
        writer === "self"
          ? "flex items-end justify-end gap-2"
          : "flex items-end justify-start gap-2"
      }
    >
      {/* 프로필 사진 */}
      {writer !== "self" && (
        <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full">
          <img src={ICON_PROFILE} alt="상대 프로필" />
        </div>
      )}

      {/* 메시지 */}
      <div
        className={`mt-1 mb-1 box-border inline-block max-w-[350px] overflow-hidden rounded-xl border-[1px] border-[#e6e6e6] p-3 pt-2 pb-2 text-sm leading-5 break-all dark:text-white ${writer === "self" ? "rounded-tr-none border-[#336cb5] bg-[#336cb5] text-white dark:border-[#4A6F9E] dark:bg-[#4A6F9E]" : "rounded-bl-none bg-[#e6e6e6] dark:border-[#606060] dark:bg-[#606060]"}`}
      >
        {children}
      </div>
    </div>
  );
}
