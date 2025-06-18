import { useContext } from "react";

import { supabase } from "../../util/supabase/global";
import { ThemeContext } from "../../util/context/global";

import ICON_LOGIN_LIGHT from "./../../assets/icon-login-light.svg";
import ICON_LOGIN_DARK from "./../../assets/icon-login-dark.svg";

export default function LoginStatus() {
  const theme = useContext(ThemeContext);

  /* 로그아웃 */
  async function onClickLogoutBtn() {
    const res = confirm("로그아웃 하시겠습니까?");
    if (!res) return;

    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("로그아웃 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
  }

  return (
    <div className="px-6">
      <button
        type="button"
        className="flex items-center gap-4 p-1 max-lg:gap-2.5"
        onClick={onClickLogoutBtn}
      >
        <div>
          <img
            src={theme !== "dark" ? ICON_LOGIN_LIGHT : ICON_LOGIN_DARK}
            alt="로그인 상태 아이콘"
            className="h-5 w-5 max-lg:h-4 max-lg:w-4"
          />
        </div>

        <div className="text-xl font-bold text-[#7D7D7D] max-lg:text-lg dark:text-white">
          <span>로그아웃</span>
        </div>
      </button>
    </div>
  );
}
