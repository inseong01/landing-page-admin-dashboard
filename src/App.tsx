import { useAtomValue } from "jotai";

import { categoryAtom } from "./util/store/atom/global";

import SidebarDisplay from "./feature/sidebar/sidebar-index";
import ChatUIDisplay from "./feature/chat/src/chat-index";
import SupbaseChannelSubscribe from "./feature/chat/src/chat-subscribe";

/*
  채팅 에러 예외처리
  - leave 되어서 sync 때 연동되지 않았을 때 메시지 수신 가능하도록

  로그인 기능 구현
*/
function App() {
  return (
    <main className="flex h-screen w-full bg-[#FAFAFA] font-[Noto_Sans]">
      {/* left */}
      <SidebarDisplay />

      {/* right */}
      <div className="h-full w-full flex-1">
        <SupbaseChannelSubscribe>
          <CategoryUIDisplay />
        </SupbaseChannelSubscribe>
      </div>
    </main>
  );
}

export default App;

function CategoryUIDisplay() {
  const cateogry = useAtomValue(categoryAtom);

  switch (cateogry) {
    case "로그인": {
      return <></>;
    }
    case "실시간 문의": {
      return <ChatUIDisplay />;
    }
    default: {
      return <></>;
    }
  }
}
