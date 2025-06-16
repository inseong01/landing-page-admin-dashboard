import { useContext } from "react";

import ICON_BACK from "./../../../assets/icon-back.svg";

import { AdminDispatchContext } from "../../../feature/admin/context";

export default function ChatHeader({
  chatroomTitle = "환영합니다",
  enableBack,
  opponentType,
  opponentStatus,
}: {
  chatroomTitle?: string;
  enableBack: boolean;
  opponentType: string;
  opponentStatus: string;
}) {
  const reducer = useContext(AdminDispatchContext);

  /* 뒤로가기 - 관리자 */
  function onClickHeaderBackIcon() {
    if (!reducer) {
      alert("채팅을 닫는 중 예기치 못한 오류가 발생했습니다.");
      return;
    }

    reducer({ type: "CLOSE_CHAT" });
  }

  return (
    <div className="relative box-border flex min-h-[71px] w-full items-center justify-center border-b-[1px] border-[#ddd] p-4">
      {/* 뒤로가기 아이콘 */}
      {enableBack && (
        <button
          className="absolute left-4 flex p-1"
          type="button"
          role="button"
          title="뒤로가기"
          aria-label="채팅창 뒤로가기"
          onClick={onClickHeaderBackIcon}
        >
          <img src={ICON_BACK} alt="뒤로가기" />
        </button>
      )}

      {/* 제목 */}
      <div className="flex cursor-default flex-col items-center gap-1.5">
        <span className="max-w-[200px] overflow-x-hidden text-center text-base leading-4 text-ellipsis whitespace-nowrap">
          {chatroomTitle}
        </span>
        <span className="text-xs leading-3 text-[#7C7C7C]">
          현재 {opponentType}는 {opponentStatus}입니다.
        </span>
      </div>
    </div>
  );
}
