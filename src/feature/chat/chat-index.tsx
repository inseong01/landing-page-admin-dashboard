import { useContext, useRef } from "react";

import { ADMIN_ID } from "./util/const/chat-const";

import CountItemDisplay from "./components/chat/count-display/display-index";
import NoneItemMessage from "./components/chat/none-message/messsage-index";

import OnlineUser from "./feature/admin/online-user";
import ChatRoomDisplay from "./feature/admin/chat-room";
import { AdminReducerStateContext } from "./feature/admin/context";

function ChatUIDisplay() {
  const state = useContext(AdminReducerStateContext);
  const chatRoomRef = useRef<HTMLDivElement>(null);

  const isRoomClicked = state.isRoomClicked;
  const userList = state.userList;

  const userIdArr = Object.keys(userList);
  const onlineUserArr = userIdArr.filter((key) => userList[key].isOnline);
  const receivedMsgCount = Object.keys(userList).reduce((acc, id) => {
    const userMessages = userList[id].messages;
    return (
      acc +
      userMessages.filter(
        (msg) => !msg.payload.isRead && msg.payload.id !== ADMIN_ID,
      ).length
    );
  }, 0);

  return (
    <>
      <div className="flex h-full w-full flex-col gap-5 p-10">
        {/* 접속현황 */}
        <div className="chatBoxBorder flex items-center justify-between p-6 shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-10 max-lg:gap-0">
            <CountItemDisplay
              category="현재접속자"
              count={onlineUserArr.length}
              unit="명"
            />

            <CountItemDisplay
              category="읽지 않은 메시지"
              count={receivedMsgCount}
              unit="건"
            />
          </div>
        </div>

        <div className="flex h-[calc(100%-20px-88px)] w-full gap-5">
          {/* 접속인원 */}
          <div className="chatBoxBorder h-full flex-1 shadow-[0_0_10px_rgba(0,0,0,0.1)]">
            {/* 제목 */}
            <div className="relative box-border flex min-h-[75px] w-full items-center justify-center border-b-[1px] border-[#ddd] p-2 pt-3 pb-3 dark:border-[#4D4D4D]">
              <div className="flex cursor-default flex-col items-center gap-1.5">
                <span className="text-xl text-[#7c7c7c] max-lg:text-lg dark:text-white">
                  접속인원
                </span>
              </div>
            </div>

            {/* 목록 */}
            <ul className="min-w-[220px] overflow-y-auto">
              {!userIdArr.length && (
                <NoneItemMessage text="현재 접속인원이 없습니다." />
              )}

              {userIdArr.map((id) => {
                return <OnlineUser key={id} id={id} />;
              })}
            </ul>
          </div>

          {/* 채팅화면 */}
          <div
            ref={chatRoomRef}
            className={`chatBoxBorder flex h-full flex-2 flex-col shadow-[0_0_10px_rgba(0,0,0,0.1)] ${isRoomClicked ? "" : "cursor-default items-center justify-center"}`}
          >
            {isRoomClicked ? (
              <ChatRoomDisplay ref={chatRoomRef} />
            ) : (
              <NoneItemMessage text="선택된 채팅방이 없습니다." />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatUIDisplay;
