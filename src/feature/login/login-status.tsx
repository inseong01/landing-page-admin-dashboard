import { useSetAtom } from "jotai";

import { loginStateAtom } from "../../util/store/atom/global";

import ICON_LOGIN_LIGHT from "./../../assets/icon-login-light.svg";

export default function LoginStatus() {
  const setlogout = useSetAtom(loginStateAtom);

  function onClickLogout() {
    setlogout(false);
  }

  return (
    <div className="px-6" onClick={onClickLogout}>
      <button type="button" className="flex items-center gap-4 p-1">
        <div>
          <img
            src={ICON_LOGIN_LIGHT}
            alt="로그인 상태 아이콘"
            className="h-5 w-5"
          />
        </div>

        <div className="text-xl font-bold text-[#7D7D7D]">
          <span>로그아웃</span>
        </div>
      </button>
    </div>
  );
}
