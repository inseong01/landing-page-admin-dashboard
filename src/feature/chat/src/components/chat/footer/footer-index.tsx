import { useState, type ChangeEvent } from "react";

import { supabase } from "../../../util/supabase/supabase-client";
import type { MessageMetaData } from "../../../util/const/const";

import ICON_SENT from "./../../../assets/icon-sent.svg";

export default function ChatFooter({
  id,
  receiver_id,
  isOpponentOnline,
}: {
  id: string;
  receiver_id: string;
  isOpponentOnline: boolean;
}) {
  const [text, typingText] = useState("");

  const MY_CHANNEL = supabase.channel("channel_1");

  /* 메시지 전송 */
  async function onClickSendMessage() {
    if (!text.length) return;

    const sent_at = new Date().toISOString();
    const isRead = false;

    const msgData: MessageMetaData = {
      type: "broadcast",
      event: "send",
      payload: { text, isTyping: false, id, sent_at, receiver_id, isRead },
    };

    const updatedOpponentState: MessageMetaData = {
      type: "broadcast",
      event: "opponent",
      payload: { text: "", isTyping: false, id, sent_at, isRead },
    };

    Promise.all([
      MY_CHANNEL.send(msgData),
      MY_CHANNEL.send(updatedOpponentState),
    ]).catch((err) => {
      if (import.meta.env.DEV) {
        console.error("Error sending messages: ", err);
      } else {
        alert("메시지 전송 중에 예기치 않은 오류가 발생했습니다.");
      }
    });

    typingText("");
  }

  /* 메시지 작성 */
  function onChangeTypingWords(e: ChangeEvent<HTMLInputElement>) {
    typingText(e.target.value);

    const sent_at = new Date().toISOString();
    const isTyping = e.target.value.length !== 0;
    const isRead = false;

    const updatedOpponentState: MessageMetaData = {
      type: "broadcast",
      event: "opponent",
      payload: { text: "", isTyping, id, sent_at, receiver_id, isRead },
    };

    MY_CHANNEL.send(updatedOpponentState).catch((err) => {
      if (import.meta.env.DEV) {
        console.error("Error typing messages: ", err);
      } else {
        alert("메시지 입력 중에 예기치 않은 오류가 발생했습니다.");
      }
    });
  }

  return (
    <div className="relative flex flex-col p-8 pt-3 pb-3">
      <div
        className={`chatBoxBorder flex justify-between overflow-hidden p-1.5 ${!isOpponentOnline ? "cursor-not-allowed bg-[#f5f5f5]" : ""}`}
      >
        <input
          type="text"
          className="box-content flex-1 bg-transparent p-1 pl-2 text-sm focus:outline-0 disabled:cursor-not-allowed"
          onChange={onChangeTypingWords}
          value={text}
          disabled={!isOpponentOnline}
          placeholder={
            isOpponentOnline
              ? "내용을 입력해주세요"
              : "메시지를 보낼 수 없습니다."
          }
        />

        <button
          type="button"
          role="button"
          className="flex items-center justify-center rounded-xl bg-[#336cb5] p-1 pr-[12px] pl-[14px] text-white hover:bg-[#2a5896] disabled:pointer-events-none disabled:bg-[#757575]"
          onClick={onClickSendMessage}
          disabled={!isOpponentOnline}
          title="전송"
          aria-label="전송"
        >
          <img src={ICON_SENT} className="h-5 w-5" alt="전송" />
        </button>
      </div>
    </div>
  );
}
