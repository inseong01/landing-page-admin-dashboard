import { useAtomValue } from "jotai";

import { categoryAtom } from "./util/store/atom/global";
import { ThemeContext } from "./util/context/global";
import { useSystemTheme } from "./util/hook/use-system-theme";

import ChatUIDisplay from "./feature/chat/chat-index";
import SupbaseChannelSubscribe from "./feature/chat/chat-subscribe";
import LoginUIDisplay from "./feature/login/login-index";
import SidebarDisplay from "./feature/chat/sidebar/sidebar-index";

function App() {
  const theme = useSystemTheme();

  return (
    <ThemeContext.Provider value={theme}>
      <main className="flex h-screen w-full bg-[#FAFAFA] font-[Noto_Sans] dark:bg-[#7D7D7D]">
        {/* left */}
        <SidebarDisplay />

        {/* right */}
        <div className="h-full w-full flex-1">
          <SupbaseChannelSubscribe>
            <CategoryUIDisplay />
          </SupbaseChannelSubscribe>
        </div>
      </main>
    </ThemeContext.Provider>
  );
}

export default App;

function CategoryUIDisplay() {
  const cateogry = useAtomValue(categoryAtom);

  switch (cateogry) {
    case "로그인": {
      return <LoginUIDisplay />;
    }
    case "실시간 문의": {
      return <ChatUIDisplay />;
    }
    default: {
      return <></>;
    }
  }
}
