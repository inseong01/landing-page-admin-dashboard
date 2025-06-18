import type { ReactNode } from "react";

export default function InputTitleBox({
  title,
  children,
  tagName,
}: {
  title: string;
  tagName: string;
  children?: ReactNode;
}) {
  return (
    <label
      htmlFor={tagName}
      className="flex cursor-default items-end justify-between text-[#434343] dark:text-[#D9D9D9]"
    >
      {/* 입력태그 이름 */}
      <span>{title}</span>

      {/* 이외 컴포넌트 */}
      {children}
    </label>
  );
}
