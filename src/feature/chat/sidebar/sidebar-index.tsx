import { useContext, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import ICON_LANDING_PAGE_LIGHT from "./../../../assets/icon-vite-logo-light.svg";
import ICON_LANDING_PAGE_DARK from "./../../../assets/icon-vite-logo-dark.svg";
import ICON_TISTORY_LIGHT from "./../../../assets/icon-tistory-logo-light.svg";
import ICON_TISTORY_DARK from "./../../../assets/icon-tistory-logo-dark.svg";
import ICON_GITHUB_LIGHT from "./../../../assets/icon-git-logo-light.svg";
import ICON_GITHUB_DARK from "./../../../assets/icon-git-logo-dark.svg";
import ICON_CHAT_LIGHT from "./../../../assets/icon-chat-light.svg";
import ICON_CHAT_DARK from "./../../../assets/icon-chat-dark.svg";
import ICON_SIDEBAR_LIGHT from "./../../../assets/icon-sidebar-light.svg";
import ICON_SIDEBAR_DARK from "./../../../assets/icon-sidebar-dark.svg";

import {
  categoryAtom,
  loginStateAtom,
  receivedMsgStateAtom,
} from "../../../util/store/atom/global";
import { ThemeContext } from "../../../util/context/global";

import CollapsibleList from "../../../components/tab/category-collapsible";
import CategoryTitle from "../../../components/tab/category-title";
import CategoryList from "../../../components/tab/category-list";

import LoginStatus from "../../login/login-status";

export default function SidebarDisplay() {
  const [isTabClicked, setTabClick] = useState(false);

  function onClickSideBarIcon() {
    setTabClick((prev) => !prev);
    return;
  }

  return (
    <div
      className={`h-full ${isTabClicked ? "w-auto justify-between" : "min-w-[380px] max-lg:min-w-[275px]"} flex max-w-[475px] flex-col gap-10 rounded-tr-2xl rounded-br-2xl bg-[#F0F0F0] pt-10 pb-2 dark:bg-[#353535]`}
    >
      {isTabClicked ? (
        <AdminPanel onClick={onClickSideBarIcon} />
      ) : (
        <AdminContent onClick={onClickSideBarIcon} />
      )}
    </div>
  );
}

function AdminPanel({ onClick }: { onClick: () => void }) {
  const theme = useContext(ThemeContext);

  return (
    <>
      {/* 패널 */}
      <div className="flex h-auto w-full cursor-default px-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="box-content flex p-1.5"
            onClick={onClick}
          >
            <img
              src={theme !== "dark" ? ICON_SIDEBAR_LIGHT : ICON_SIDEBAR_DARK}
              alt="사이드바 버튼"
              className="flex h-7 w-7"
            />
          </button>
        </div>
      </div>
    </>
  );
}

function AdminContent({ onClick }: { onClick: () => void }) {
  const theme = useContext(ThemeContext);
  const setCategory = useSetAtom(categoryAtom);
  const isLogin = useAtomValue(loginStateAtom);
  const hasReceivedMsg = useAtomValue(receivedMsgStateAtom);

  function onClickCategory(title: string) {
    if (!isLogin) {
      return alert("로그인이 필요합니다.");
    }

    setCategory(title);
  }

  const loginText = isLogin ? "환영합니다." : "로그인이 필요합니다.";

  return (
    <>
      {/* 헤더 */}
      <div className="flex h-[86px] w-full cursor-default flex-col gap-2.5 px-7 max-lg:gap-1">
        <div className="flex items-center justify-between gap-10 max-lg:gap-4">
          <span className="text-4xl font-bold max-lg:text-2xl dark:text-white">
            관리자 대시보드
          </span>

          <button type="button" className="p-1.5" onClick={onClick}>
            <img
              src={theme !== "dark" ? ICON_SIDEBAR_LIGHT : ICON_SIDEBAR_DARK}
              alt="사이드바 버튼"
              className="flex h-7 w-7"
            />
          </button>
        </div>

        <span className="text-xl font-bold text-[#747474] max-lg:text-lg dark:text-[#D9D9D9]">
          {loginText}
        </span>
      </div>

      {/* 메인 */}
      <div className="flex h-[calc(100%-136px)] w-full flex-col justify-between gap-2.5 max-lg:gap-1">
        {/* 카테고리 목록 */}
        <ul className="flex h-full flex-col gap-8 overflow-auto max-lg:gap-4">
          {/* 카테고리 : 페이지 바로가기 */}
          <CollapsibleList>
            {(isExpanded, setIsExpanded) => (
              <>
                <CategoryTitle
                  title={"페이지 바로가기"}
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                />

                {isExpanded && (
                  <ul>
                    <CategoryList
                      listTitle="랜딩 페이지"
                      icon_alt="랜딩 페이지 파비콘"
                      icon_src={
                        theme !== "dark"
                          ? ICON_LANDING_PAGE_LIGHT
                          : ICON_LANDING_PAGE_DARK
                      }
                      url="https://inseong-landing-page.vercel.app/"
                      hasURL={true}
                      hasAlert={false}
                    />

                    <CategoryList
                      listTitle="티스토리"
                      icon_alt="티스토리 파비콘"
                      icon_src={
                        theme !== "dark"
                          ? ICON_TISTORY_LIGHT
                          : ICON_TISTORY_DARK
                      }
                      url="https://inseong1204.tistory.com/"
                      hasURL={true}
                      hasAlert={false}
                    />

                    <CategoryList
                      listTitle="깃허브"
                      icon_alt="깃허브 파비콘"
                      icon_src={
                        theme !== "dark" ? ICON_GITHUB_LIGHT : ICON_GITHUB_DARK
                      }
                      url="https://github.com/inseong01"
                      hasURL={true}
                      hasAlert={false}
                    />
                  </ul>
                )}
              </>
            )}
          </CollapsibleList>

          {/* 카테고리 : 페이지 관리 */}
          <li>
            <CategoryTitle title={"페이지 관리"} />

            <ul>
              <CategoryList
                listTitle="실시간 문의"
                icon_alt="실시간 문의 아이콘"
                icon_src={theme !== "dark" ? ICON_CHAT_LIGHT : ICON_CHAT_DARK}
                hasURL={false}
                onClick={() => onClickCategory("실시간 문의")}
                hasAlert={hasReceivedMsg}
              />
            </ul>
          </li>
        </ul>

        {/* 로그인 상태 */}
        {isLogin && <LoginStatus />}
      </div>
    </>
  );
}
