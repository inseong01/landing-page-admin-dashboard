import { useAtomValue } from "jotai";

import { categoryAtom } from "./util/store/atom/global";
import { ThemeContext } from "./util/context/global";
import { useSystemTheme } from "./util/hook/use-system-theme";

import MessageCaption from "./components/message/caption-description";

import SupabaseChannelSubscribe from "./feature/chat/chat-subscribe";
import SidebarDisplay from "./feature/sidebar/sidebar-index";
import ChatUIDisplay from "./feature/chat/chat-index";
import LoginUIDisplay from "./feature/login/login-index";

const categoryUIMap = {
  LOGIN: LoginUIDisplay,
  CHAT: ChatUIDisplay,
};

function App() {
  const theme = useSystemTheme();
  const category = useAtomValue(categoryAtom);
  const CategoryUI = categoryUIMap[category];

  return (
    <ThemeContext.Provider value={theme}>
      <main className="flex h-screen w-full bg-[#FAFAFA] font-[Noto_Sans] dark:bg-[#7D7D7D]">
        {/* left */}
        <SidebarDisplay />

        {/* right */}
        <div className="h-full w-full flex-1">
          <SupabaseChannelSubscribe>
            {CategoryUI ? <CategoryUI /> : <ErrorUI />}
          </SupabaseChannelSubscribe>
        </div>
      </main>
    </ThemeContext.Provider>
  );
}

export default App;

function ErrorUI() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <MessageCaption description="오류가 발생했습니다." />
    </div>
  );
}
