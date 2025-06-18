import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <div className="flex h-dvh w-full cursor-default flex-col items-center justify-center gap-4 font-[Noto_Sans] dark:bg-[#353535]">
      <span className="text-xl font-bold text-[#434343] dark:text-[#D9D9D9]">
        페이지를 찾을 수 없습니다.
      </span>

      <nav>
        <NavLink
          to="/"
          end
          className="p-1 text-lg text-[#7d7d7d] hover:text-[#434343] dark:text-[#7D7D7D] dark:hover:text-[#d9d9d9]"
        >
          <span>돌아가기</span>
        </NavLink>
      </nav>
    </div>
  );
}
