import { useContext, useEffect, useRef } from "react";

import type { MessageMetaData } from "../../../util/const/const";
import { UserIDContextContext } from "../../../util/context/global";

import MessageBox from "../message-box/box-index";

export default function ChatBody({
  messages,
  isOpponentTyping,
}: {
  messages: MessageMetaData[];
  isOpponentTyping: boolean;
}) {
  const chatRoomRef = useRef<HTMLDivElement>(null);

  /* 메시지 창 위치 조절 */
  useEffect(() => {
    if (!chatRoomRef.current) return;

    const chatRoomHeight = chatRoomRef.current.scrollHeight;
    chatRoomRef.current.scrollTo(0, chatRoomHeight);
  }, [messages, isOpponentTyping]);

  return (
    <div
      className="relative box-border h-full w-full overflow-auto p-8 pt-3 pb-3"
      ref={chatRoomRef}
    >
      {/* 메시지 목록 */}
      {messages.map((msg, index) => (
        <Message key={index} msg={msg} />
      ))}

      {/* 입력중 애니메이션 */}
      {isOpponentTyping && <TypingAnimation />}
    </div>
  );
}

function Message({ msg }: { msg: MessageMetaData }) {
  const USER_ID = useContext(UserIDContextContext);

  const writer = USER_ID === msg.payload.id ? "self" : "other";
  const content = msg.payload.text;

  return <MessageBox writer={writer}>{content}</MessageBox>;
}

function TypingAnimation() {
  return (
    <MessageBox writer={"other"}>
      <div className="flex items-center justify-center gap-[6px]">
        <CircleSpan animation={"animate-[softBlink_1s_infinite_0ms]"} />
        <CircleSpan animation={"animate-[softBlink_1s_infinite_100ms]"} />
        <CircleSpan animation={"animate-[softBlink_1s_infinite_200ms]"} />
      </div>
    </MessageBox>
  );
}

function CircleSpan({ animation }: { animation: string }) {
  return (
    <span
      className={`mt-1 mb-1 block h-3 w-3 origin-center transition ${animation} rounded-full bg-[#b8b8b8]`}
    ></span>
  );
}
