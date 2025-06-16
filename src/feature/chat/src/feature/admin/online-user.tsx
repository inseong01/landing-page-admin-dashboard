import { useContext } from "react";

import type { MessageMetaData } from "../../util/const/const";

import { AdminDispatchContext, AdminReducerStateContext } from "./context";
import { getDateTime } from "./function/get-time";

export default function OnlineUser({
  id,
}: {
  id: MessageMetaData["payload"]["id"];
}) {
  const state = useContext(AdminReducerStateContext);
  const reducer = useContext(AdminDispatchContext);

  const selectedID = state.selectedID;
  const user = state.userList[id];
  const isTyping = user.isTyping;
  const isOnline = user.isOnline;
  const messages = user.messages;
  const latestMessage = messages.at(-1);

  const name = user.userName;
  const status = isOnline ? "온라인" : "오프라인";
  const text = latestMessage?.payload.text ?? " ";
  const sent_at = latestMessage
    ? getDateTime("time", new Date(latestMessage.payload.sent_at))
    : "";
  const userStatusOrSentAt = isOnline
    ? !latestMessage
      ? status
      : sent_at
    : status;

  const messagesLength = messages.filter((msg) => !msg.payload.isRead).length;
  const isMessagesAboveLimit = messagesLength > 9;
  const count = isMessagesAboveLimit ? "9+" : messagesLength;

  /* 채팅방 열기 */
  const onClickOpenBtn = () => {
    if (id === selectedID) return;
    if (!latestMessage) return;
    if (!reducer) return;

    reducer({ type: "OPEN_CHAT", id });
    reducer({ type: "READ_USER_MESSAGE", id });
  };

  return (
    <li
      className={`box-border w-full cursor-pointer p-3 pr-7 pl-7 hover:bg-[#f2f2f2] ${id === selectedID ? "bg-[#f2f2f2]" : ""}`}
      onClick={onClickOpenBtn}
    >
      <div className="mb-1.5 flex items-center justify-between text-[#a7a7a7]">
        {/* 사용자 이름 */}
        <span className="w-3/5 overflow-hidden text-base text-ellipsis whitespace-nowrap text-[#222]">
          {name}
        </span>

        {/* 사용자 상태 및 수신 시간 */}
        <span className="font-bold">{userStatusOrSentAt}</span>
      </div>
      <div className="flex h-6 w-full justify-between overflow-hidden leading-5 text-ellipsis whitespace-nowrap">
        {/* 메시지 미리보기 */}
        <span className="w-4/5 max-w-[230px] overflow-x-hidden text-ellipsis whitespace-nowrap text-[#606060]">
          {isTyping ? "작성중.." : text}
        </span>

        {/* 안 읽은 메시지 개수 */}
        {messagesLength > 0 && (
          <span className="inline-block rounded-xl bg-[#E83939] p-3 pt-0.5 pb-0.5 font-bold text-white">
            {count}
          </span>
        )}
      </div>
    </li>
  );
}
